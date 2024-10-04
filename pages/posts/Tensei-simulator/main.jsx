import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
// import BackgroundRain from '../../components/Background' //this path is relative to the main.jsx, which is this file.
import Script from "next/script";
// import NavBar from "@/pages/components/navbar";

/** 
This is a personal project written by Lynx using Next, React and tailwind. It's simply a reincarnation simulation.
The data is acquired from the UN, the svg map is from wikicommons, the csv parser uses papaparse and 
the map zoom functionalities is fulfuilled by the svg-pan-zoom API. A separate worker is used to conduct data process, consdierable amount of asnyc prog.
**/

async function dataFetch() {
  try {
    const response = await fetch(
      "/Tensei simulator/annual-number-of-births-by-world-region.csv"
    ); //starts a request to fetch the csv, async
    const csvText = await response.text(); // since it's async, it can be used with then handler, which takes the result and operates it. This text() method is used to read the response as a text, and return a new promise
    const parsedPromise = new Promise((resolve, reject) => {
      Papa.parse(csvText, { complete: resolve, error: reject }); //see papa api https://www.papaparse.com/docs#results
    });

    const result = await parsedPromise;
    return result.data;
  } catch (error) {
    //this takes the result of the last step, which is the string of csv and parse it using the papa api. Since the papa api is synchronus, we make it async.
    console.error("Parse error:", error);
  }
}

export default function Home() {
  const [lastHighlightedCountryName, setLastHighlightedCountryName] =
    useState(null);

  const [isTenseing, setIsTenseing] = useState(false);

  function applyFillColor(node, offTime = null) {
    if (node.nodeType === 1 && node.nodeName.toLowerCase() !== "title") {
      node.classList.add("highlighted"); // Apply fill color
      // Recursively apply fill color to all children of the current node
      node.childNodes.forEach((e) => applyFillColor(e, offTime));
    }

    if (
      node.nodeType === 1 &&
      node.nodeName.toLowerCase() !== "title" &&
      offTime !== null
    ) {
      node.classList.add("highlighted"); // Apply fill color
      setTimeout(() => {
        node.classList.remove("highlighted");
      }, offTime);
      // Recursively apply fill color to all children of the current node
      node.childNodes.forEach((e) => applyFillColor(e, offTime));
    }
  }

  function removeColor(node) {
    if (node.nodeType === 1 && node.nodeName.toLowerCase() !== "title") {
      node.classList.remove("highlighted"); // Apply fill color
      // Recursively apply fill color to all children of the current node
      node.childNodes.forEach((e) => removeColor(e));
    }
    if (node.nodeType === 1 && node.nodeName.toLowerCase() !== "title") {
      node.classList.remove("highlighted");
    }
  }

  function highlightReincarnatedCountry(
    countryObj,
    startRdmHighlight,
    isPermanent = false
  ) {
    // Process random countries with a delay
    setIsTenseing(true)
    if (lastHighlightedCountryName && isPermanent == false) {
      removeColor(
        document
          .getElementById("worldMap")
          .contentDocument.getElementById(lastHighlightedCountryName)
      );
    }

    if (startRdmHighlight) {
      let rndCountryList = countryObj[5].filter((e) => e != undefined);

      rndCountryList.forEach((countryCode, index) => {
        setTimeout(() => {
          let rndCountryElement = document
            .getElementById("worldMap")
            .contentDocument.getElementById(countryCode.toLowerCase());
          if (rndCountryElement && rndCountryElement != undefined) {
            applyFillColor(rndCountryElement, 100);
          }
        }, 100 * index); // Delay increases for each country, which makes the country highlight only after the first one has disappeared
      });

      setLastHighlightedCountryName(countryObj[1]);

      let countryElement = document
        .getElementById("worldMap")
        .contentDocument.getElementById(countryObj[1]);

      setTimeout(() => {
        applyFillColor(countryElement); // Highlight the last generated country permanently
        setIsTenseing(false)
      }, 100 * rndCountryList.length);
    }

    console.log(
      `Country: ${countryObj[0]} 
      \nTotal birth at the year: ${countryObj[3]}
      \nProbability: ${countryObj[4] * 100} %`
    );
  }

  async function calculate(year) {
    console.log("Calculation state changed:", isTenseing);
    try {
      const parsedData = await dataFetch(); //fetch and parse data
      const worker = new Worker("/Tensei simulator/pCalculator.js"); //the path is relative to the public folder
      worker.postMessage({ parsedData, year }); //send message to the worker

      worker.onmessage = function (e) {
        //peform action on the result
        highlightReincarnatedCountry(e.data, true);
        // let countrySvg = document.getElementById('in')
        // console.log(countrySvg)
        worker.terminate();
      };
      worker.onerror = function (e) {
        console.error("Worker error:", e.message);
      };
    } catch (error) {
      console.log("failed to process data:", error);
    }
  }

  useEffect(() => {
    let mapElement = document.getElementById("worldMap");
    const onObjectLoad = () => {
      svgPanZoom(mapElement, {
        minzoom: 0.8,
        zoomScaleSensitivity: 0.25,
        controlIconsEnabled: true,
        contain: true,
        center: true,
      });
    };

    mapElement.addEventListener("load", onObjectLoad);

    return () => {
      mapElement.removeEventListener("load", onObjectLoad);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Tensei simulator</title>
        <script async src="/Tensei simulator/svg-pan-zoom.js" />
      </Head>
      {/* <NavBar/> */}
    {/* |  <div><BackgroundRain/></div> */}
      <main className="bg-gray-100 min-h-screen">
        <div className=" flex justify-center items-center flex-col p-10">
      <p className="font-bold text-2xl my-2 text-center">Tensei simulator</p>
        {/* Add the hover on element and magnify glass */}
        <div
          id="mapContainer"
          className="max-w-[100vw] w-full max-h-[605px] h-full border mt-10 overflow-hidden bg-white"
        >
          <object
            id="worldMap"
            type="image/svg+xml"
            className="max-w-[100vw] w-full max-h-[605px] h-[100vh]"
            data="\Tensei simulator\BlankMap-World.svg"
          ></object>
        </div>
        <button
          onClick={() => {calculate(2021)}}
          disabled={isTenseing}
          className="mt-5 w-[80px] h-[40px] border border-gray-200 bg-white rounded-lg drop-shadow-md hover:drop-shadow-sm hover:broder-sm"
        >
          Tensei!
        </button>
        <div>
   
          <br />
          <p>
            If, unfortunately, you are sick of the endless suffering and
            struggle of this life in this world, and you wished to see where you
            would reincarnate (or 転生 <i>Tensei</i> if you like Japanese Anime)
            as a new baby in this world (if that actually happens) when you die
            for some reason. Or, if you are simply curious about the result.
            Here&apos;s a simulator that tests your gacha RNG (aka luck), try it
            and see if you could reincarnate to your dream country.
          </p>
          <p>click here if you want to know how this simulator opeartes</p>
          <p>
            This simulator calculates the probability of reincarnation in a
            specific country takes the UN data on global demographics from 1950
            to 2022. The possibilities of reincarnating in countries based on
            income group are also calculated.
          </p>
        </div>
        </div>
      </main>
    </>
  );
}

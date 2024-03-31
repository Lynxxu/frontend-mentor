import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import Script from "next/script";

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
  async function calculate(year) {
    try {
      const parsedData = await dataFetch(); //fetch and parse data
      const worker = new Worker("/Tensei simulator/pCalculator.js"); //the path is relative to the public folder
      worker.postMessage({ parsedData, year }); //send message to the worker

      worker.onmessage = function (e) {
        console.log("calculation:", e.data); //peform action on the result
        worker.terminate();
      };
      worker.onerror = function (e) {
        console.error("Worker error:", e.message);
      };
    } catch (error) {
      console.log("failed to process data:", error);
    }
  }
  function randomHighlightMap() {}
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const mapElement = document.getElementById('worldMap')
    function onObjectLoad(){
      setLoaded(true)
      var panZoomMap = svgPanZoom(document.getElementById("worldMap"), {
        minzoom:0.8,
        zoomscalesensitivity: 0.25,
        controlIconsEnabled: true,
        contain:true,
        center:true
    }   
    )};
    mapElement.addEventListener('load', onObjectLoad)
    return()=>{
      mapElement.removeEventListener('load', onObjectLoad)
    }
  },[]);

  

  return (
    <>
   
      <Head>
        <title>Tensei simulator</title>
        <script async src="/Tensei simulator/svg-pan-zoom.js" />
      </Head>
      
      <main className="flex justify-center items-center flex-col m-10 ">
        <div>
          <p className="font-bold text-2xl my-2">Introduction</p>
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
        {/* Add the hover on element and magnify glass */}
        <div
          id="mapContainer"
          className="max-w-[100vw] w-full max-h-[605px] h-full border border-rose-200 mt-10 overflow-hidden"
        >
        <object id='worldMap' type="image/svg+xml" className="max-w-[100vw] w-full max-h-[605px] h-[100vh]" data="\Tensei simulator\BlankMap-World.svg"></object>
        </div>
        <button
          onClick={() => calculate(2021)}
          className="mt-5 w-[80px] h-[40px] border border-gray-200 bg-gray-200 rounded-lg drop-shadow-md hover:drop-shadow-sm hover:broder-sm"
        >
          Tensei!
        </button>
      </main>
    </>
  );
}

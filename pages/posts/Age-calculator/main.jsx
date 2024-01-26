import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AgeCalculator() {
  const [day, setDay] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [year, setYear] = useState(undefined);

  const [outputDay, setOutputDay] = useState("--");
  const [outputMonth, setOutputMonth] = useState("--");
  const [outputYear, setOutputYear] = useState("--");

  const [dayValidity, setDayValidity] = useState("");
  const [monthValidity, setMonthValidity] = useState("");
  const [yearValidity, setYearValidity] = useState("");
  const [dateValidity, setDateValidity] = useState("");
  const [inputValidity, setInputValidity] = useState(false);

  let inputState = [false, false, false, false];

  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function checkInput(day, month, year) {
    let dateNow = new Date();
    let yearNow = dateNow.getFullYear();

    if (day >= 1 && day <= 31) {
      setDayValidity("valid");
      inputState[0] = true;
    } else if (day == 0) {
      setDayValidity("noInput");
    } else {
      setDayValidity("invalidDay");
    }

    if (month >= 1 && month <= 12) {
      setMonthValidity("valid");
      inputState[1] = true;
    } else if (month == 0) {
      setMonthValidity("noInput");
    } else {
      setMonthValidity("invalidMonth");
    }

    if (year >= 100 && year <= yearNow) {
      setYearValidity("valid");
      inputState[2] = true;
    } else if (year == 0) {
      setYearValidity("noInput");
    } else {
      setYearValidity("invalidYear");
    }

    if (day > daysInMonths[month - 1] && dayValidity == "valid") {
      setDateValidity("invalid");
    } else {
      setDateValidity("valid");
      inputState[3] = true;
    }

    if (
      dayValidity == "valid" &&
      monthValidity == "valid" &&
      yearValidity == "valid" &&
      dateValidity == "valid"
    ) {
      setInputValidity(true);
    } else {
      setInputValidity(false);
    }

    console.log(
      dayValidity,
      monthValidity,
      yearValidity,
      dateValidity,
      inputState
    );

    return inputValidity;
  }

  function CalculateAge(day, month, year, inputState) {
    if (inputState.every((e) => e == true)) {
      let bornDate = new Date(year, month - 1, day);
      let currentDate = new Date();
      let ageYears = currentDate.getFullYear() - bornDate.getFullYear();
      let ageMonths;
      let ageDays;

      if (currentDate.getMonth() >= bornDate.getMonth()) {
        ageMonths = currentDate.getMonth() - bornDate.getMonth();
      } else {
        ageYears--;
        ageMonths = currentDate.getMonth() - bornDate.getMonth() + 12;
      }

      if (currentDate.getDate() >= bornDate.getDate()) {
        ageDays = currentDate.getDate() - bornDate.getDate();
      } else {
        if (ageMonths == 0) {
          ageMonths + 11;
          year--;
        } else {
          ageMonths--;
        }

        ageDays =
          daysInMonths[currentDate.getMonth()] +
          currentDate.getDate() -
          bornDate.getDate();
      }

      setOutputDay(ageDays);
      setOutputMonth(ageMonths);
      setOutputYear(ageYears);
    }
  }

  return (
    <>
      <Head>
        <title>Age Calculator</title>
      </Head>
      <main className="inset-0 grid w-full h-[100svh] bg-gray-200 items-center justify-items-center font-calculator ">
        <div className="max-w-[1440px] w-[95%] md:w-[80%] h-full max-h-[500px] sm:max-h-[800px] lg:max-h-[1000px] bg-white flex rounded-3xl rounded-br-[100px] sm:rounded-br-[300px] flex-col items-center lg:items-start">
          <div className="max-w-[1340px] w-full h-[20%] max-h-[400px] flex sm:ml-10 lg:ml-24 mt-20 justify-center lg:justify-normal">
            <div className="flex items-center font-semibold sm:text-xl text-gray-500 ">
              <div className="flex flex-col">
                <p className="sm:text-lg text-xs">DAY</p>
                <input
                  id="Day"
                  type="text"
                  className="border-gray-400 border rounded-md mr-10 md:h-20 md:w-36 xl:h-28 xl:w-56 sm:h-14 sm:w-24 w-12 h-6 font-bold text-sm sm:text-4xl text-black sm:pl-5 pl-1"
                  placeholder="DD"
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                />
                <div className="h-0">
                  {dayValidity == "noInput" && (
                    <p className=" italic text-lg text-red-500 font-light ">
                      This field is required
                    </p>
                  )}
                  {dayValidity == "invalidDay" && (
                    <p className=" italic text-lg text-red-500 font-light ">
                      Please enter a valid day
                    </p>
                  )}
                  {dateValidity == "invalid" && (
                    <p className=" italic text-lg text-red-500 font-light ">
                      Please enter a valid date
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col" id="Month">
                <div className="sm:text-lg text-xs">MONTH</div>
                <input
                  type="text"
                  className="border-gray-400 text-sm border rounded-md mr-10 md:h-20 md:w-36 xl:h-28 xl:w-56 sm:h-14 sm:w-24 w-12 h-6 font-bold sm:text-4xl text-black pl-1 sm:pl-5"
                  placeholder="MM"
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                />
                <div className="h-0">
                  {monthValidity == "noInput" && (
                    <p className=" italic text-lg text-red-500 font-light ">
                      This field is required
                    </p>
                  )}
                  {monthValidity == "invalidMonth" && (
                    <p className=" italic text-lg text-red-500 font-light ">
                      Please enter a valid month
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col" id="Year">
                <div className="sm:text-lg text-xs">YEAR</div>
                <input
                  type="text"
                  className="border-gray-400 border text-sm rounded-md mr-5 md:h-20 md:w-36 xl:h-28 xl:w-56  sm:h-14 sm:w-24 w-12 h-6 font-bold sm:text-4xl text-black pl-1 sm:pl-5"
                  placeholder="YYYY"
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
                <div className="h-0">
                  {yearValidity == "noInput" && (
                    <p className=" italic text-lg text-red-500 font-light ">
                      This field is required
                    </p>
                  )}
                  {yearValidity == "invalidYear" && (
                    <p className=" italic text-lg text-red-500 font-light ">
                      Please enter a valid year
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center sm:ml-10 lg:ml-24 sm:mt-8 w-full justify-center sm:justify-normal">
            <hr className="border border-gray xl:w-3/4 lg:w-[75%] sm:w-4/5 w-[60%]" />
            <button
              onClick={() => {
                checkInput(day, month, year);
                CalculateAge(day, month, year, inputState);
              }}
            >
              <div className="bg-[#854dff] rounded-full w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] md:w-[100px] flex items-center justify-center hover:bg-black hover:drop-shadow-xl md:h-[100px] p-3 sm:p-0 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="44"
                  viewBox="0 0 46 44"
                >
                  <g fill="none" stroke="white" strokeWidth="2">
                    <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                  </g>
                </svg>
              </div>
            </button>
          </div>
          <div className="ml-10 lg:ml-24 mt-5  sm:text-[5rem] md:text-[7rem] xl:text-[10rem] leading-none font-bold italic text-[2.5rem]">
            <p>
              <span className="text-[#854dff]">
                {outputYear === undefined ? "-- " : outputYear}
              </span>
              &nbsp;years
            </p>
            <p>
              <span className="text-[#854dff]">
                {outputMonth === undefined ? "-- " : outputMonth}
              </span>
              &nbsp;months
            </p>
            <p>
              <span className="text-[#854dff]">
                {outputDay === undefined ? "-- " : outputDay}
              </span>
              &nbsp;days
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

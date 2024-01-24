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
      <main className="grid w-full h-screen bg-gray-200 items-center justify-items-center font-calculator ">
        <div className="max-w-[1440px] w-[90%] h-full max-h-[1000px] bg-white flex rounded-3xl rounded-br-[300px] flex-col items-start">
          <div className="max-w-[1340px] w-full h-[20%] max-h-[400px] flex ml-24 mt-20">
            <div className="flex items-center font-semibold text-xl text-gray-500 ">
              <div className="flex flex-col">
                <p>DAY</p>
                <input
                  id="Day"
                  type="text"
                  className="border-gray-400 border rounded-md mr-10 h-28 w-56 font-bold text-4xl text-black pl-5"
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
                MONTH
                <input
                  type="text"
                  className="border-gray-400 border rounded-md mr-10 h-28 w-56 font-bold text-4xl text-black pl-5"
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
                YEAR
                <input
                  type="text"
                  className="border-gray-400 border rounded-md mr-5 h-28 w-56 font-bold text-4xl text-black pl-5"
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
          <div className="flex flex-row items-center w-full ml-24 mb-10">
            <hr className="border border-gray w-3/4 " />
            <button
              onClick={() => {
                checkInput(day, month, year);
                CalculateAge(day, month, year, inputState);
              }}
            >
              <div className="bg-[#854dff] rounded-full w-[100px] flex items-center justify-center hover:bg-black hover:drop-shadow-xl h-[100px]">
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
          <div className="ml-24 text-[10rem] leading-none font-bold italic">
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

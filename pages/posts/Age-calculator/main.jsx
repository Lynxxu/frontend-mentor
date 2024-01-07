import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AgeCalculator() {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  function CalculateAge(day, month, year) {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let bornDate = new Date(year, month - 1, day);
    let currentDate = new Date();
    let ageYears = currentDate.getFullYear() - bornDate.getFullYear();
    let ageMonths = 0;
    let ageDays = 0;

    if (currentDate.getMonth() >= bornDate.getMonth()) {
      ageMonths = currentDate.getMonth() - bornDate.getMonth();
    } else {
      ageYears--;
      ageMonths = currentDate.getMonth() - bornDate.getMonth() + 12;
    }

    if (currentDate.getDate() >= bornDate.getDate()) {
      ageDays = currentDate.getDate() - bornDate.getDate();
    } else {
      ageMonths--;
      ageDays =
        months[currentDate.getMonth()] +
        currentDate.getDate() -
        bornDate.getDate();
    }
    setDay(ageDays);
    setMonth(ageMonths);
    setYear(ageYears);

    return ageDays, ageMonths, ageYears;
  }

  return (
    <>
      <Head>
        <title>Age Calculator</title>
      </Head>
      <main className="grid w-full h-screen bg-gray-200 items-center justify-items-center font-calculator">
        <div className="max-w-[1440px] w-[90%] h-full max-h-[1000px] bg-white flex rounded-3xl rounded-br-[300px] items-center flex-col">
          <div className="max-w-[1340px] w-full h-[50%] max-h-[900px] flex p-10">
            <div className="flex h-50 items-center font-semibold text-xl uppercase text-gray-500">
              <div className="flex flex-col">
                Day
                <input
                  id="Day"
                  type="text"
                  className="border-gray-400 border rounded-md mr-5 h-28 w-56 font-bold text-4xl text-black pl-5"
                  placeholder="DD"
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col" id="Month">
                Month
                <input
                  type="text"
                  className="border-gray-400 border rounded-md mr-5 h-28 w-56 font-bold text-4xl text-black pl-5"
                  placeholder="MM"
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col" id="Year">
                Year
                <input
                  type="text"
                  className="border-gray-400 border rounded-md mr-5 h-28 w-56 font-bold text-4xl text-black pl-5"
                  placeholder="YYYY"
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </div>
            </div>
            <button onClick={() => CalculateAge(day, month, year)}>
              <div className="bg-[#854dff] rounded-full w-[80px] h-[80px] flex items-center justify-center hover:bg-black hover:drop-shadow-xl">
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
          <div className="text-8xl ">
            <p>{year === 0 ? "--" : year} Years</p>
            <p>{month === 0 ? "--" : month} Months</p>
            <p>{day === 0 ? "--" : day} Days</p>
          </div>
        </div>
      </main>
    </>
  );
}

onmessage = function (e) {
  const { parsedData, year } = e.data; //extract the data and year from the countryProbect sent from main
  const result = countryOfReincarnation(parsedData, year);
  postMessage(result);
};

function countryOfReincarnation(data, year) {
  const largeClassifier = [
    "Small island developing states (SIDS)",
    "Upper-middle-income countries",
    "More developed regions",
    "Low-income countries",
    "Lower-middle-income countries",
    "Less developed regions, excluding least developed countries",
    "Less developed regions, excluding China",
    "Less developed regions",
    "Least developed countries",
    "Land-locked developing countries (LLDC)",
    "High-income countries",
    "World",
  ];

  function weightedRandDistn(probObj) {
    let i,
      sum = 0,
      r = Math.random();
    for (i in probObj) {
      sum += probObj[i];
      if (r <= sum) return i;
    }
  }

  const countryProb = {};
  const regionProb = {};

  const yearArray = data.filter((innerArray) => innerArray[2] == year); //shrink the data to only the year required

  let totalBirth = yearArray.find((e) => e[0] == "World")[3]; //finds the world birth

  yearArray.forEach((entry) => {
    largeClassifier.includes(entry[0])
      ? (regionProb[entry[0]] = entry[3] / totalBirth)
      : (countryProb[entry[0]] = entry[3] / totalBirth);
  }); //calculate and separate per country birth probability and regional and income classified groups

  const mostUnlikelyCountry = Object.keys(countryProb).reduce((key, v) =>
    countryProb[v] < countryProb[key] ? v : key
  ); // Returns the most unlikely country for reincarnation

  let reincarnatedCountry = weightedRandDistn(countryProb);
  let reincarnatedCountryProb = countryProb[reincarnatedCountry]  // Enable this code for decimal control >= 0.1 ? (countryProb[reincarnatedCountry] * 100).toFixed(2) : countryProb[reincarnatedCountry] * 100

  return {country: reincarnatedCountry, probability: Number(reincarnatedCountryProb), temp};
}

  /**
  This code is used to generate a list of country codes that are stored in the countryCode.json file
  const temp = {}
  yearArray.forEach(((entry)=>{temp[entry[0]] = entry[1]}))
  console.log(temp)
  **/
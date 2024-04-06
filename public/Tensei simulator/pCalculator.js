onmessage = function (e) {
  const { parsedData, year } = e.data; //extract the data and year from the countryProbect sent from main
  const result = countryOfReincarnation(parsedData, year);
  postMessage(result);
};
let countryISOMapping = {
  AFG: "AF",
  ALB: "AL",
  DZA: "DZ",
  ASM: "AS",
  AND: "AD",
  AGO: "AO",
  AIA: "AI",
  ATA: "AQ",
  ATG: "AG",
  ARG: "AR",
  ARM: "AM",
  ABW: "AW",
  AUS: "AU",
  AUT: "AT",
  AZE: "AZ",
  BHS: "BS",
  BHR: "BH",
  BGD: "BD",
  BRB: "BB",
  BLR: "BY",
  BEL: "BE",
  BLZ: "BZ",
  BEN: "BJ",
  BMU: "BM",
  BTN: "BT",
  BOL: "BO",
  BES: "BQ",
  BIH: "BA",
  BWA: "BW",
  BVT: "BV",
  BRA: "BR",
  VGB: "VG",
  IOT: "IO",
  BRN: "BN",
  BGR: "BG",
  BFA: "BF",
  BDI: "BI",
  KHM: "KH",
  CMR: "CM",
  CAN: "CA",
  CPV: "CV",
  CYM: "KY",
  CAF: "CF",
  TCD: "TD",
  CHL: "CL",
  CHN: "CN",
  HKG: "HK",
  MAC: "MO",
  CXR: "CX",
  CCK: "CC",
  COL: "CO",
  COM: "KM",
  COG: "CG",
  COD: "CD",
  COK: "CK",
  CRI: "CR",
  CIV: "CI",
  HRV: "HR",
  CUB: "CU",
  CUW: "CW",
  CYP: "CY",
  CZE: "CZ",
  DNK: "DK",
  DJI: "DJ",
  DMA: "DM",
  DOM: "DO",
  ECU: "EC",
  EGY: "EG",
  SLV: "SV",
  GNQ: "GQ",
  ERI: "ER",
  EST: "EE",
  ETH: "ET",
  FLK: "FK",
  FRO: "FO",
  FJI: "FJ",
  FIN: "FI",
  FRA: "FR",
  GUF: "GF",
  PYF: "PF",
  ATF: "TF",
  GAB: "GA",
  GMB: "GM",
  GEO: "GE",
  DEU: "DE",
  GHA: "GH",
  GIB: "GI",
  GRC: "GR",
  GRL: "GL",
  GRD: "GD",
  GLP: "GP",
  GUM: "GU",
  GTM: "GT",
  GGY: "GG",
  GIN: "GN",
  GNB: "GW",
  GUY: "GY",
  HTI: "HT",
  HMD: "HM",
  VAT: "VA",
  HND: "HN",
  HUN: "HU",
  ISL: "IS",
  IND: "IN",
  IDN: "ID",
  IRN: "IR",
  IRQ: "IQ",
  IRL: "IE",
  IMN: "IM",
  ISR: "IL",
  ITA: "IT",
  JAM: "JM",
  JPN: "JP",
  JEY: "JE",
  JOR: "JO",
  KAZ: "KZ",
  KEN: "KE",
  KIR: "KI",
  PRK: "KP",
  KOR: "KR",
  KWT: "KW",
  KGZ: "KG",
  LAO: "LA",
  LVA: "LV",
  LBN: "LB",
  LSO: "LS",
  LBR: "LR",
  LBY: "LY",
  LIE: "LI",
  LTU: "LT",
  LUX: "LU",
  MKD: "MK",
  MDG: "MG",
  MWI: "MW",
  MYS: "MY",
  MDV: "MV",
  MLI: "ML",
  MLT: "MT",
  MHL: "MH",
  MTQ: "MQ",
  MRT: "MR",
  MUS: "MU",
  MYT: "YT",
  MEX: "MX",
  FSM: "FM",
  MDA: "MD",
  MCO: "MC",
  MNG: "MN",
  MNE: "ME",
  MSR: "MS",
  MAR: "MA",
  MOZ: "MZ",
  MMR: "MM",
  NAM: "NA",
  NRU: "NR",
  NPL: "NP",
  NLD: "NL",
  NCL: "NC",
  NZL: "NZ",
  NIC: "NI",
  NER: "NE",
  NGA: "NG",
  NIU: "NU",
  NFK: "NF",
  MNP: "MP",
  NOR: "NO",
  OMN: "OM",
  PAK: "PK",
  PLW: "PW",
  PSE: "PS",
  PAN: "PA",
  PNG: "PG",
  PRY: "PY",
  PER: "PE",
  PHL: "PH",
  PCN: "PN",
  POL: "PL",
  PRT: "PT",
  PRI: "PR",
  QAT: "QA",
  REU: "RE",
  ROU: "RO",
  RUS: "RU",
  RWA: "RW",
  BLM: "BL",
  SHN: "SH",
  KNA: "KN",
  LCA: "LC",
  MAF: "MF",
  SPM: "PM",
  VCT: "VC",
  WSM: "WS",
  SMR: "SM",
  STP: "ST",
  BES: "BQ",
  SEN: "SN",
  SRB: "RS",
  SYC: "SC",
  SLE: "SL",
  SGP: "SG",
  SXM: "SX",
  SVK: "SK",
  SVN: "SI",
  SLB: "SB",
  SOM: "SO",
  ZAF: "ZA",
  SGS: "GS",
  SSD: "SS",
  ESP: "ES",
  LKA: "LK",
  SDN: "SD",
  SUR: "SR",
  SJM: "SJ",
  SWZ: "SZ",
  SWE: "SE",
  CHE: "CH",
  SYR: "SY",
  TWN: "TW",
  TJK: "TJ",
  TZA: "TZ",
  THA: "TH",
  TLS: "TL",
  TGO: "TG",
  TKL: "TK",
  TON: "TO",
  TTO: "TT",
  TUN: "TN",
  TUR: "TR",
  TKM: "TM",
  TCA: "TC",
  TUV: "TV",
  UGA: "UG",
  UKR: "UA",
  ARE: "AE",
  GBR: "GB",
  USA: "US",
  URY: "UY",
  UZB: "UZ",
  VUT: "VU",
  VEN: "VE",
  VNM: "VN",
  VIR: "VI",
  WLF: "WF",
  ESH: "EH",
  YEM: "YE",
  ZMB: "ZM",
  ZWE: "ZW",
  XKX: "XK"
}
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
  const randomHighlightCs = []



  const yearArray = data.filter((innerArray) => innerArray[2] == year); //shrink the data to only the year required

  let totalBirth = yearArray.find((e) => e[0] == "World")[3]; //finds the world birth

  yearArray.forEach((entry) => {
    largeClassifier.includes(entry[0])
      ? (regionProb[entry[0]] = entry[3] / totalBirth)
      : (countryProb[entry[0]] = entry[3] / totalBirth);
  }); //calculate and separate per country birth probability and regional and income classified groups

  const mostUnlikelyCountry = Object.keys(countryProb).reduce((key, v) =>
    countryProb[v] < countryProb[key] ? v : key
  ); // The most unlikely country for reincarnation


  let keys=Object.values(countryISOMapping)
  for (let i = 0; i < 10;i++) {
    const rndInt = Math.floor(Math.random() * 250) + 1  
    randomHighlightCs.push(keys[rndInt])
  }
  
  let reincarnatedDestination = weightedRandDistn(countryProb);
  let reincarnatedCountryProb = countryProb[reincarnatedDestination]  // Enable this code for decimal control >= 0.1 ? (countryProb[reincarnatedCountry] * 100).toFixed(2) : countryProb[reincarnatedCountry] * 100
  let reincarnatedCountryObj = yearArray.find((e) => e[0] == reincarnatedDestination)
  reincarnatedCountryObj.push(reincarnatedCountryProb,randomHighlightCs)
  reincarnatedCountryObj[1] = countryCodeConverter(reincarnatedCountryObj[1]).toLowerCase()
  reincarnatedCountryObj.push(randomHighlightCs)
  return reincarnatedCountryObj;
}


function countryCodeConverter(countryCode){
    return countryISOMapping[countryCode]
}

  /**
  This code is used to generate a list of country codes that are stored in the countryCode.json file
  const temp = {}
  yearArray.forEach(((entry)=>{temp[entry[0]] = entry[1]}))
  console.log(temp)
  **/
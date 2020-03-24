// Script for UNC Bootcamp Homework for Weather App
// Weather App 5 day forecast CSS 
// Eddie Saunders
// saunders.eddie@outlook.com
// 21st March 2020

// Initial creations 21st March 2020 EXS

var priorCities = [];
var priorCitiesCount = 6;
const myAPIKey = "f9c22785936f5fc5811e20fb8cb7e2fc";

const locationDetails = {
  geoLocation: { lon: 0.00, lat: 0.00 },
  currentWeather: {
    date: "",
    name: "",
    temp: 0.00,
    humidity: 0,
    uvIndex: 0,
    icon: ""
  },

  day1Weather: {
    day1date: "",
    day1Temp: 0.00,
    day1Humidity: 0,
    day1Icon: ""
  },

  day2Weather: {
    day2date: "",
    day2Temp: 0.00,
    day2Humidity: 0,
    day2Icon: ""
  },

  day3Weather: {
    day3date: "",
    day3Temp: 0.00,
    day3Humidity: 0,
    day3Icon: ""
  },

  day4Weather: {
    day4date: "",
    day4Temp: 0.00,
    day4Humidity: 0,
    day4Icon: ""
  },

  day5Weather: {
    day5date: "",
    day5Temp: 0.00,
    day5Humidity: 0,
    day5Icon: ""
  },
};

var locationsSearched = ["", "", "", "", "", "", "", ""];
var city1 = Object.create(locationDetails)

// Set an event for our search button
// This will take the data searched for and send it to the searchCity, which in turn will populate
// our data

$("#searchBtn").click(function (event) {
  myCity = $("#userSearch").val();
  event.preventDefault();
  get5Day($("#userSearch").val());
  getCurrentConditions(myCity);
});

// Our functions go here

// Get current forecast and if successful our LAt/Long for UVI
function getCurrentConditions(myCity) {
  var currentConditionsURL = "https://api.openweathermap.org/data/2.5/weather?q=" + myCity + "&appid=" + myAPIKey;
  $.ajax({
    url: currentConditionsURL,
    method: "GET"
  })
    // We have a nested call here to collect the UV after we've collected the lat/lon
    .then(function (response) {
      console.log("My Current City: ", response);
      console.log(response.coord.lon);
      city1.geoLocation.lon = response.coord.lon;
      city1.geoLocation.lat = response.coord.lat;
      getCurrentUVIndex(city1.geoLocation.lat, city1.geoLocation.lon)
    });
}

// Get 5 day forecast
function get5Day(myCity) {
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + myCity + "&appid=" + myAPIKey;
  console.log("API Call URL - 5 Day: ", fiveDayURL);
  console.log("5 Day Forecast: ", myCity);
  $.ajax({
    url: fiveDayURL,
    method: "GET"
  })
    .then(function (response) {
      for (var i = 0; i < 40; i += 8) {
        console.log("My City 5 Day: ", response);
      }
    });
}

// Get current UV Index
function getCurrentUVIndex(myLat, myLon) {
  var UVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?" + "appid=" + myAPIKey + "&lat=" + myLat + "&lon=" + myLon;
  $.ajax({
    url: UVIndexURL,
    method: "GET"
  })
    .then(function (response) {
      console.log("My UV Index: ", response);
    })
}
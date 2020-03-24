// Script for UNC Bootcamp Homework for Weather App
// Weather App 5 day forecast CSS 
// Eddie Saunders
// saunders.eddie@outlook.com
// 21st March 2020

// Initial creations 21st March 2020 EXS

var priorCities = [];
var priorCitiesCount = 6;
const myAPIKey = "f9c22785936f5fc5811e20fb8cb7e2fc";

var locationsSearched = ["", "", "", "", "", "", "", ""];

// Set an event for our search button
// This will take the data searched for and send it to the searchCity, which in turn will populate
// our data

$("#searchBtn").click(function (event) {
  myCity = $("#userSearch").val();
  event.preventDefault();
  get5Day($("#userSearch").val());
  getCurrentConditions(myCity);
});


// Populate our screen info:
$('#cityName').text(city1.currentWeather.name);
$('#uvIndex').text(city1.uvIndex);
checkUVRange();
// Our functions go here

function checkUVRange () {
  currentUV = parseInt($('#uvIndex').val());
  console.log(currentUV);
}
// Get current forecast and if successful our Lat/Long for UVI
function getCurrentConditions(myCity) {
  var currentConditionsURL = "https://api.openweathermap.org/data/2.5/weather?q=" + myCity + "&appid=" + myAPIKey;
  $.ajax({
    url: currentConditionsURL,
    method: "GET"
  })
    // We have a nested call here to collect the UV after we've collected the lat/lon
    .then(function (response) {
      console.log(response);
      $('#cityName').text(response.name);
      $('#temp').text(response.main.temp);
      $('#humidity').text(response.main.humidity);
      $('#windSpeed').text(response.wind.speed);
      $('#weatherIcon').text(response.weather[0].icon);
      // Pass our coords to get the UV
      getCurrentUVIndex(response.coord.lat, response.coord.lon)
   
    });
}

// Get 5 day forecast
function get5Day(myCity) {
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + myCity + "&appid=" + myAPIKey;
  //console.log("API Call URL - 5 Day: ", fiveDayURL);
  //console.log("5 Day Forecast: ", myCity);
  $.ajax({
    url: fiveDayURL,
    method: "GET"
  })
    .then(function (response) {
      for (var i = 0; i < 40; i += 8) {
       // console.log("My City 5 Day: ", response);
      }
    });
}

// Get current UV Index, this is called from within current forecast to get our UV index.
function getCurrentUVIndex(myLat, myLon) {
  var UVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?" + "appid=" + myAPIKey + "&lat=" + myLat + "&lon=" + myLon;
  $.ajax({
    url: UVIndexURL,
    method: "GET"
  })
    .then(function (response) {
      //city1.uvIndex = response.value;

      //console.log("My UV Index: ", city1.uvIndex);
      $('#uvIndex').text(response.value);
    })
}
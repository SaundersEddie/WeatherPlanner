// Script for UNC Bootcamp Homework for Weather App
// Weather App 5 day forecast CSS 
// Eddie Saunders
// saunders.eddie@outlook.com
// 21st March 2020

// Initial creations 21st March 2020 EXS

var priorCities = [];
var priorCitiesCount = 6;
const myAPIKey = "f9c22785936f5fc5811e20fb8cb7e2fc";
const weatherIconURL= "http://openweathermap.org/img/wn/";
const weatherIconURLEnd ="@2x.png";

var locationsSearched = ["", "", "", "", "", "", "", ""];

// Set an event for our search button
// This will take the data searched for and send it to the searchCity, which in turn will populate
// our data

$("#searchBtn").click(function (event) {
  // One of the search button events is to move the searched for place to the top of the list
  // and shift everything else down one list. We could probably just do a prepend, however it might
  // be a better idea to review the list and if the searched for city is already listed, not readd it.
  myCity = $("#userSearch").val();
  locationsSearched.unshift(myCity);
  console.log (locationsSearched);
  event.preventDefault();
  get5Day($("#userSearch").val());
  getCurrentConditions(myCity);
});

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
      //console.log(response);
      myTemp = tempConversion(response.main.temp);
      myWeatherIcon = weatherIconURL+response.weather[0].icon+weatherIconURLEnd
      $('#cityName').text(response.name);
      $('#temp').text(myTemp);
      $('#humidity').text(response.main.humidity);
      $('#windSpeed').text(response.wind.speed);
      $('#weatherIcon').text(myWeatherIcon);
      // Pass our coords to get the UV
      getCurrentUVIndex(response.coord.lat, response.coord.lon)
   
    });
}

// Get 5 day forecast
// const weatherIconURL= "http://openweathermap.org/img/wn/";
// const weatherIconURLEnd ="@2x.png";
function get5Day(myCity) {
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + myCity + "&appid=" + myAPIKey;
  $.ajax({
    url: fiveDayURL,
    method: "GET"
  })
    .then(function (response) {
      console.log (response);
      var myForecastDate = 1;
      for (var i = 0; i < 40; i += 8) {
        myWeatherIcon = weatherIconURL+response.list[i].weather[0].icon+weatherIconURLEnd
        myTemp=tempConversion(response.list[i].main.temp)
        myDateID = "#day"+myForecastDate+"Date";
        myIconID = "#day"+myForecastDate+"Icon";
        myTempID = "#day"+myForecastDate+"Temp";
        myHumidID = "#day"+myForecastDate+"Humid";
        $(myDateID).text(response.list[i].dt_txt);
        $(myIconID).text(myWeatherIcon);
        $(myTempID).text(myTemp);
        $(myHumidID).text(response.list[i].main.humidity);
         myForecastDate++; 
     
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

function tempConversion (myKTemp) {
  convertedTemp = ((myKTemp-273.15)*1.8)+32;
  convertedTemp = convertedTemp.toFixed(2)
  console.log ("My Converted Temp: ",convertedTemp);
  return convertedTemp;
}
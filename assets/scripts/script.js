// Script for UNC Bootcamp Homework for Weather App
// Weather App 5 day forecast
// Eddie Saunders
// saunders.eddie@outlook.com
// 21st March 2020
// Initial creations 21st March 2020 EXS
// 25th March Updates EXS
// Created URL for icon display
// Created kelvin temp conversion to F
// Created list for locations visited

const myAPIKey = "f9c22785936f5fc5811e20fb8cb7e2fc";
const weatherIconURL = "<img src='http://openweathermap.org/img/wn/";
const weatherIconURLEnd = "@2x.png' alt='Weather Icon'>";

var myMoment = moment();
var locationsSearched = ["", "", "", "", "", "", "", ""];
var useCentigrade = false; // If we decide to implement centigrade this will be the toggle, default is false

// Set an event for our search button
// This will take the data searched for and send it to the searchCity, which in turn will populate
// our data

$("#searchBtn").click(function (event) {
  // One of the search button events is to move the searched for place to the top of the list
  // and shift everything else down one list. We could probably just do a prepend, however it might
  // be a better idea to review the list and if the searched for city is already listed, not readd it.
  myCity = $("#userSearch").val();
  if (!locationsSearched.includes(myCity)) {locationsSearched.unshift(myCity);}
  event.preventDefault();
  get5Day($("#userSearch").val());
  getCurrentConditions(myCity);
  updateSearchedList();
  checkUVRange();
});

// Our functions go here

function checkUVRange() {
  currentUV = parseInt($('#uvIndex').val());
  // lets do a simple UV range check
  if (currentUV > 2) {
    $('#uvIndex').addClass("uvMed");
  }
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
      myWeatherIcon = weatherIconURL + response.weather[0].icon + weatherIconURLEnd
      $('#cityName').text(response.name);
      $('#temp').text(myTemp);
      $('#humidity').text(response.main.humidity);
      $('#windSpeed').text(response.wind.speed);
      $('#weatherIcon').html(myWeatherIcon);
      // Pass our coords to get the UV
      getCurrentUVIndex(response.coord.lat, response.coord.lon)

    });
}
// Get 5 day forecast
function get5Day(myCity) {
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + myCity + "&appid=" + myAPIKey;
  $.ajax({
    url: fiveDayURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);
      var myForecastDate = 1;
      for (var i = 0; i < 40; i += 8) {
        myWeatherIcon = weatherIconURL + response.list[i].weather[0].icon + weatherIconURLEnd
        myTemp = tempConversion(response.list[i].main.temp)
        console.log("My Temp: ", myTemp);
        myDateID = "#day" + myForecastDate + "Date";
        myIconID = "#day" + myForecastDate + "Icon";
        myTempID = "#day" + myForecastDate + "Temp";
        myHumidID = "#day" + myForecastDate + "Humid";
        var myPulledDate = response.list[i].dt_txt.substring(0,10);
        myMomentDate = moment(myPulledDate).format("MM/DD/YYYY");
        console.log(myMomentDate);
        console.log (myPulledDate);
        $(myDateID).text(myMomentDate)
        $(myIconID).html(myWeatherIcon);
        $(myTempID).text(myTemp);
        $(myHumidID).text(response.list[i].main.humidity);
        myForecastDate++;
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
      $('#uvIndex').text(response.value);
    })
}
// Take our supplied kelvin temp and convert to farenheit, if time allows we may do a selector for 
// a centigrade option
// Version 1 EXS 25th MArch 2020
function tempConversion(myKTemp) {
  convertedFTemp = ((myKTemp - 273.15) * 1.8) + 32;
  convertedCTemp = (myKTemp - 273.15);
  // Here we would put in a check to see if C || F was selected and set convertedTemp to that
  if (useCentigrade === true) {
    convertedTemp = convertedCTemp.toFixed(2)
  } else { convertedTemp = convertedFTemp.toFixed(2) };

  console.log("My Converted Temp: ", convertedTemp);
  return convertedTemp;
}
// Update our list, things we need to improve are checks for letter case right now, the search will see
// London and LONDON as two different entries
// Version 1 EXS 25th March 2020
function updateSearchedList() {
  console.log("Update our searched list");
  console.log(locationsSearched);
  for (var i = 0; i < 8; i++) {
    myPlace = "#place" + parseInt((i) + 1);
    console.log(myPlace);
    $(myPlace).text(locationsSearched[i]);
  }
}
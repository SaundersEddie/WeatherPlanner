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

// Initalization
initialization();

// Set an event for our search button
// This will take the data searched for and send it to the searchCity, which in turn will populate
// our data

$("#searchBtn").click(function (event) {
  // One of the search button events is to move the searched for place to the top of the list
  // and shift everything else down one list. We could probably just do a prepend, however it might
  // be a better idea to review the list and if the searched for city is already listed, not readd it.
  myCity = $("#userSearch").val();
  if (!locationsSearched.includes(myCity)) { locationsSearched.unshift(myCity); }
  event.preventDefault();
  get5Day($("#userSearch").val());
  getCurrentConditions(myCity);
  updateSearchedList();
  checkUVRange();
});

// Our functions go here

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
        myDateID = "#day" + myForecastDate + "Date";
        myIconID = "#day" + myForecastDate + "Icon";
        myTempID = "#day" + myForecastDate + "Temp";
        myHumidID = "#day" + myForecastDate + "Humid";
        var myPulledDate = response.list[i].dt_txt.substring(0, 10);
        $(myDateID).text(moment(myPulledDate).format("MM/DD/YYYY"));
        $(myIconID).html(myWeatherIcon);
        $(myTempID).text(myTemp);
        $(myHumidID).text(response.list[i].main.humidity);
        myForecastDate++;
      }
    });
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
      $('#cityName').html("<p>" + response.name + "</p>");
      $('#weatherIcon').html(myWeatherIcon);
      $('#temp').text(myTemp);
      $('#humidity').text(response.main.humidity);
      $('#windSpeed').text(response.wind.speed);
      // Pass our coords to get the UV
      getCurrentUVIndex(response.coord.lat, response.coord.lon)
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
      checkUVRange(response.value);
    })
}


function checkUVRange(currentUV) {
  //currentUV = parseInt($('#uvIndex').val());
  console.log("Calling Current UV Function: ", currentUV);
  // lets do a simple UV range check
  $('#uvIndex').removeClass();
  if (currentUV <= 2) {
    console.log("Low: ", currentUV);
    $('#uvIndex').addClass("uvLow");
  }

  if (currentUV > 2 && currentUV < 5) {
    console.log("Med: ", currentUV);
    $('#uvIndex').addClass("uvMed");
  }

  if (currentUV > 5 && currentUV < 8) {
    console.log("High: ", currentUV);
    $('#uvIndex').addClass("uvHigh");
  }

  if (currentUV > 8) {
    console.log("ZOMG!: ", currentUV);
    $('#uvIndex').addClass("uvOMG");
  }

}


// Take our supplied kelvin temp and convert to farenheit, if time allows we may do a selector for 
// a centigrade option
// Version 1 EXS 25th MArch 2020
function tempConversion(myKTemp) {
  convertedFTemp = ((myKTemp - 273.15) * 1.8) + 32;
  convertedCTemp = (myKTemp - 273.15);
  // Here we would put in a check to see if C || F was selected and set convertedTemp to that
  // This is currently not in use, but maybe included in future.
  if (useCentigrade === true) {
    convertedTemp = convertedCTemp.toFixed(2)
  } else { convertedTemp = convertedFTemp.toFixed(2) };

  //console.log("My Converted Temp: ", convertedTemp);
  return convertedTemp;
}
// Update our list, things we need to improve are checks for letter case right now, the search will see
// London and LONDON as two different entries
// Version 1 EXS 25th March 2020
function updateSearchedList() {
  console.log("Update our searched list");
  console.log(locationsSearched);
  // Create our table list
  var myLocationTableStart = "<table><thead><tr><thSearched Locations</th></tr></thead></tbody>"
  var myLocationTable = [];
  for (var i = 0; i < 8; i++) {
    myLocationTable[i] = "<tr><td>" + locationsSearched[i] + "</td></tr>";
  }
  myLocationTableEnd = "</tbody></table>"
  //console.log ("my Location Tablle:: ",myLocationTable);
  myTable = myLocationTableStart + myLocationTable + myLocationTableEnd;
  //console.log ("My Table: ", myTable);
  if (locationsSearched[0] != "") {
  $('#placesTable').html(myTable);
  }
  // myTable.append(myLocationTable);
  // ).append(myLocationTable);


}

// Initial Data Load
function initialization() {
  get5Day("London");
  getCurrentConditions("London");
  updateSearchedList();
  checkUVRange();
}
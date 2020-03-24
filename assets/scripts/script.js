// Script for UNC Bootcamp Homework for Weather App
// Weather App 5 day forecast CSS 
// Eddie Saunders
// saunders.eddie@outlook.com
// 21st March 2020

// Initial creations 21st MArch 2020 EXS

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
  //get5Day($("#userSearch").val());
  getCurrentConditions(myCity);
  console.log(city1);
  console.log (city1.geoLocation.lon);
  console.log (city1.geoLocation.lat);
  // getCurrentUVIndex(city1.geoLocation.lon, city1.geoLocation.lat);


});





// Our functions go here

// Get current forecast and if successful our LAt/Long for UVI
function getCurrentConditions(myCity) {
  var currentConditionsURL = "https://api.openweathermap.org/data/2.5/weather?q=" + myCity + "&appid=" + myAPIKey;
  // console.log ("API Call URL - Testing: ",currentConditionsURL);
  console.log("Current Weather Conditions: ", myCity);
  $.ajax({
    url: currentConditionsURL,
    method: "GET"
  })
    .then(function (response) {
      console.log("My Current City: ", response);
      console.log (response.coord.lon);
      city1.geoLocation.lon = response.coord.lon;
      city1.geoLocation.lat = response.coord.lat;
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
  console.log("Getting UV Index");
  // const myUVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=f9c22785936f5fc5811e20fb8cb7e2fc&lat=51.7766&lon=-0.1116";

  var UVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?" + "appid=" + myAPIKey + "&Lat=" + myLat + "&Lon=" + myLon;
  console.log (UVIndexURL);
  $.ajax({
    url: UVIndexURL,
    method: "GET"
  })
    .then(function (response) {
      // console.log ("My UV Index: ", response);
    })
}



// This returns 5 days in 3 hour intervals.



// Get our primary city data for the 5 day forecast
// city5DayTemp. city5DayHumidity, city5DayIcon,city5DayTemp, city5DayDate
// The data returned is only for 5 days, with 3 hour increments
// $.ajax({
//       url: myCityURL,
//       method: "GET"
//     })
//   .then(function(response) 
//   {
//     for (var i = 0; i < 40; i += 8) 
//     {
//           console.log("My City 5 Day: ", response);
//     }
//   });

  // This call we get our current city, this also pulls our data for the Lat/Lon for the current
  // UV index.
  // $.ajax ({
  //   url: myCurrentCityURL,
  //   method: "GET"
  // })
  // .then(function(response)
  // {
  //  // console.log ("My Current City: ", response);
  // });

  // Here we pull our UV Index
  // $.ajax({
  //   url: myUVIndexURL,
  //   method: "GET"
  // })
  //   .then(function(response) {
  //    // console.log ("My UV Index: ", response);
  // })



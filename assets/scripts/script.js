// Script for UNC Bootcamp Homework for Weather App
// Weather App 5 day forecast CSS 
// Eddie Saunders
// saunders.eddie@outlook.com
// 21st March 2020

// Initial creations 21st MArch 2020 EXS

var priorCities = [];
var priorCitiesCount = 6;

const locationDetails = {
  geoLocation: {lon: 0.00, lat: 0.00},
  currentWeather: {
  date: "",
  name: "",
  temp: 0.00,
  humidity: 0,
  uvIndex: 0,
  icon: ""},
  
  day1Weather: {
  day1date: "",
  day1Temp: 0.00,
  day1Humidity: 0,
  day1Icon: "" },

  day2Weather: {
  day2date: "",
  day2Temp: 0.00,
  day2Humidity: 0,
  day2Icon: ""},

  day3Weather: {
  day3date: "",
  day3Temp: 0.00,
  day3Humidity: 0,
  day3Icon: "" },

  day4Weather: {
  day4date: "",
  day4Temp: 0.00,
  day4Humidity: 0,
  day4Icon: "" },

  day5Weather: {
  day5date: "",
  day5Temp: 0.00,
  day5Humidity: 0,
  day5Icon: ""},
};

let KansasCity = Object.create(locationDetails);
var locationsSearched = ["","","","","","","",""];


const myAPIKey = "f9c22785936f5fc5811e20fb8cb7e2fc";
var weatherDataIndex = 0;
// This returns 5 days in 3 hour intervals.
var myCurrentCityURL = 'https://api.openweathermap.org/data/2.5/weather?q=Harlow&appid=f9c22785936f5fc5811e20fb8cb7e2fc'
var myCityURL = "https://api.openweathermap.org/data/2.5/forecast?q=Harlow&appid=f9c22785936f5fc5811e20fb8cb7e2fc";
var myUVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=f9c22785936f5fc5811e20fb8cb7e2fc&lat=51.7766&lon=-0.1116";

// Get our primary city data for the 5 day forecast
// city5DayTemp. city5DayHumidity, city5DayIcon,city5DayTemp, city5DayDate
$.get(myCityURL, function (response) {
  //console.log(response);
  // part of this resoponse is a list array of 40 items containing the dt_txt which we can use to get our 5 day forecast from
  // Every 8 array elements is 24 hours later
  for (var i = 0; i < 40; i += 8) {
    console.log("API Response: ", response.list[i].dt_txt, response.list[i].main.temp, response.list[i].wind.speed, response.list[i].main.humidity);
    console.log("CoOrds: ", response.city.coord.lat, response.city.coord.lon);
    console.log(weatherDataIndex);
    weatherDataIndex++;
  }
});

// Get our UV data
// currentUVIndex
$.get(myUVIndexURL, function (response) {
  console.log("currentUVIndex: ", response.value);
});

// Get our current forecast
// We'll use this to pull our current conditions
// currentTemp, currentHumidity, currentWindSpeed, currentConditions, currentIcon, currentLat, currentLon
$.get(myCurrentCityURL, function (response) {

 // console.log("Respose: ", response);
  console.log("currentTemp: ", response.main.temp);
  console.log("currentHumidity: ", response.main.humidity);
  console.log("currentWindSpeed: ", response.wind.speed);
  console.log("CurrentConditions", response.weather[0].description);
  console.log("currentIcon: ", response.weather[0].icon);
  console.log("CurrentLat: ", response.coord.lat);
  console.log("CurrentLon: ", response.coord.lon);
})
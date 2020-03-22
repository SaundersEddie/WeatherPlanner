// Script for UNC Bootcamp Homework for Weather App
// Weather App 5 day forecast CSS 
// Eddie Saunders
// saunders.eddie@outlook.com
// 21st March 2020

// Initial creations 21st MArch 2020 EXS

const myAPIKey = "f9c22785936f5fc5811e20fb8cb7e2fc";

// This returns 5 days in 3 hour intervals.
myCityURL = "https://api.openweathermap.org/data/2.5/forecast?q=Harlow&appid=f9c22785936f5fc5811e20fb8cb7e2fc";


$.get(myCityURL, function (response) {
    console.log(response);
    console.log (response.list[0].dt_txt);
  });
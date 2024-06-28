// ------------------------------------------------ activate preloader

let loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

var cityArray = "giza";
localStorage.setItem("currentCity", cityArray);

// ------------------------------------------------ Selectors

let weather__searchform = document.getElementById("weather__searchform");
let searchWeather = document.getElementById("searchWeather");

let weather_unit_celsius = document.getElementById("weather_unit_celsius");
let weather_unit_farenheit = document.getElementById("weather_unit_farenheit");

let city = document.getElementById("city");

let datetime = document.getElementById("weather__datetime");
let weather__status = document.getElementById("weather__status");
let weather__icon = document.getElementById("weather__icon");
let weather__temperature = document.getElementById("weather__temperature");
let weather__minmax = document.getElementById("weather__minmax");
let weather__humidity = document.getElementById("weather__humidity");
let weather__wind = document.getElementById("weather__wind");

let Next__weather__datetime = document.getElementById(
  "Next__weather__datetime"
);
let Next__weather__status = document.getElementById("Next__weather__status");
let Next__weather__icon = document.getElementById("Next__weather__icon");
let Next__weather__temperature = document.getElementById(
  "Next__weather__temperature"
);
let Next__weather__minmax = document.getElementById("Next__weather__minmax");
let Next__weather__humidity = document.getElementById(
  "Next__weather__humidity"
);
let Next__weather__wind = document.getElementById("Next__weather__wind");

let After__Next__weather__datetime = document.getElementById(
  "After__Next__weather__datetime"
);
let After__Next__weather__status = document.getElementById(
  "After__Next__weather__status"
);
let After__Next__weather__icon = document.getElementById(
  "After__Next__weather__icon"
);
let After__Next__weather__temperature = document.getElementById(
  "After__Next__weather__temperature"
);
let After__Next__weather__minmax = document.getElementById(
  "After__Next__weather__minmax"
);
let After__Next__weather__humidity = document.getElementById(
  "After__Next__weather__humidity"
);
let After__Next__weather__wind = document.getElementById(
  "After__Next__weather__wind"
);

// ------------------------------------------------ fetch API data

async function fetchWeatherData(Location) {
  let fetchWeatherData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b3bae2bd155a4f9ea2564314242306&q=${Location}&days=3`
  );
  let weatherData = await fetchWeatherData.json();
  return weatherData;
}

// ------------------------------------------------ displayCurrentDayData

function displayCurrentDayData(data) {
  let date = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  datetime.innerHTML = date.toLocaleString("en-US", options);
  city.innerHTML = data.location.name;
  weather__status.innerHTML = data.current.condition.text;
  weather__icon.innerHTML = `<img src="https:${data.current.condition.icon}">`;
  let temp_c = data.current.temp_c;
  weather__temperature.innerHTML = `
    Current Temperature     
    <br>                             
     °${temp_c}`;
  let mintemp_c = data.forecast.forecastday[0].day.mintemp_c;
  let maxtemp_c = data.forecast.forecastday[0].day.maxtemp_c;
  weather__minmax.innerHTML = `
  <p>Min:  ° ${mintemp_c} </p>
  <p>Max:  ° ${maxtemp_c}</p>
  `;
  weather__humidity.innerHTML = data.current.humidity + ` %`;
  weather__wind.innerHTML = data.current.wind_kph + ` kph`;
}

// ------------------------------------------------ displayNextDaysData

function displayNextDayData(data) {
  // ------------------------------------------------ NextDayData
  let date = new Date(data.forecast.forecastday[1].date);
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  Next__weather__datetime.innerHTML = date.toLocaleString("en-US", options);
  Next__weather__status.innerHTML =
    data.forecast.forecastday[1].day.condition.text;
  Next__weather__icon.innerHTML = `<img src="https:${data.forecast.forecastday[1].day.condition.icon}">`;
  let temp_c1 = data.forecast.forecastday[1].day.avgtemp_c;
  Next__weather__temperature.innerHTML = `
    Average Temperature     
    <br>                             
     °${temp_c1}`;
  let mintemp_c1 = data.forecast.forecastday[1].day.mintemp_c;
  let maxtemp_c1 = data.forecast.forecastday[1].day.maxtemp_c;
  Next__weather__minmax.innerHTML = `
  <p>Min:  ° ${mintemp_c1} </p>
  <p>Max:  ° ${maxtemp_c1}</p>
  `;
  Next__weather__humidity.innerHTML =
    data.forecast.forecastday[1].day.avghumidity + ` %`;
  Next__weather__wind.innerHTML =
    data.forecast.forecastday[1].day.maxwind_kph + ` kph`;

  // ------------------------------------------------ AfterNextDayData
  let date2 = new Date(data.forecast.forecastday[2].date);
  let options2 = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  After__Next__weather__datetime.innerHTML = date2.toLocaleString(
    "en-US",
    options2
  );
  After__Next__weather__status.innerHTML =
    data.forecast.forecastday[2].day.condition.text;
  After__Next__weather__icon.innerHTML = `<img src="https:${data.forecast.forecastday[2].day.condition.icon}">`;
  let temp_c2 = data.forecast.forecastday[2].day.avgtemp_c;
  After__Next__weather__temperature.innerHTML = `
    Average Temperature     
    <br>                             
     °${temp_c2}`;
  let mintemp_c2 = data.forecast.forecastday[2].day.mintemp_c;
  let maxtemp_c2 = data.forecast.forecastday[2].day.maxtemp_c;
  After__Next__weather__minmax.innerHTML = `
  <p>Min:  ° ${mintemp_c2} </p>
  <p>Max:  ° ${maxtemp_c2}</p>
  `;
  After__Next__weather__humidity.innerHTML =
    data.forecast.forecastday[2].day.avghumidity + ` %`;
  After__Next__weather__wind.innerHTML =
    data.forecast.forecastday[2].day.maxwind_kph + ` kph`;
}

// ------------------------------------------------ getWeatherData

async function getWeatherData(Location = "Giza") {
  let getWeatherData = await fetchWeatherData(Location);
  if (!getWeatherData.error) {
    if (weather__searchform.value == "") {
      displayCurrentDayData(getWeatherData);
      displayNextDayData(getWeatherData);
    } else {
      displayCurrentDayData(getWeatherData);
      displayNextDayData(getWeatherData);
      var cityArray = weather__searchform.value;
      localStorage.setItem("currentCity", cityArray);
    }
  } else {
  }
}
function searchWeatherr() {
  getWeatherData(weather__searchform.value);
}

getWeatherData();

// ------------------------------------------------ changeTemperatureUnit

// ------------------------------------------------ changeTempToFarenheit
function changeTempToFarenheit(data) {
  // ------------------------------------------------ changeCurrentDayTempToFarenheit

  let temp_f = data.current.temp_f;
  let mintemp_f = data.forecast.forecastday[0].day.mintemp_f;
  let maxtemp_f = data.forecast.forecastday[0].day.maxtemp_f;
  weather__temperature.innerHTML = `
    Current Temperature     
    <br>                             
     °${temp_f}`;
  weather__minmax.innerHTML = `
  <p>Min:  ° ${mintemp_f} </p>
  <p>Max:  ° ${maxtemp_f}</p>
  `;

  // ------------------------------------------------ changeNextTempToFarenheit

  let temp_f1 = data.forecast.forecastday[1].day.avgtemp_f;
  Next__weather__temperature.innerHTML = `
    Average Temperature     
    <br>                             
     °${temp_f1}`;
  let mintemp_f1 = data.forecast.forecastday[1].day.mintemp_f;
  let maxtemp_f1 = data.forecast.forecastday[1].day.maxtemp_f;
  Next__weather__minmax.innerHTML = `
  <p>Min:  ° ${mintemp_f1} </p>
  <p>Max:  ° ${maxtemp_f1}</p>
  `;

  // ------------------------------------------------ changeAfterNextTempToFarenheit

  let temp_f2 = data.forecast.forecastday[2].day.avgtemp_f;
  After__Next__weather__temperature.innerHTML = `
    Average Temperature     
    <br>                             
     °${temp_f2}`;
  let mintemp_f2 = data.forecast.forecastday[2].day.mintemp_f;
  let maxtemp_f2 = data.forecast.forecastday[2].day.maxtemp_f;
  After__Next__weather__minmax.innerHTML = `
  <p>Min:  ° ${mintemp_f2} </p>
  <p>Max:  ° ${maxtemp_f2}</p>
  `;
}

// ------------------------------------------------ changeTempToCelsius
function changeTempToCelsius(data) {
  // ------------------------------------------------ changeCurrentDayTempToCelsius

  let temp_c = data.current.temp_c;
  let mintemp_c = data.forecast.forecastday[0].day.mintemp_c;
  let maxtemp_c = data.forecast.forecastday[0].day.maxtemp_c;
  weather__temperature.innerHTML = `
    Current Temperature     
    <br>                             
     °${temp_c}`;
  weather__minmax.innerHTML = `
  <p>Min:  ° ${mintemp_c} </p>
  <p>Max:  ° ${maxtemp_c}</p>
  `;

  // ------------------------------------------------ changeNextTempToCelsius

  let temp_c1 = data.forecast.forecastday[1].day.avgtemp_c;
  Next__weather__temperature.innerHTML = `
    Average Temperature     
    <br>                             
     °${temp_c1}`;
  let mintemp_c1 = data.forecast.forecastday[1].day.mintemp_c;
  let maxtemp_c1 = data.forecast.forecastday[1].day.maxtemp_c;
  Next__weather__minmax.innerHTML = `
  <p>Min:  ° ${mintemp_c1} </p>
  <p>Max:  ° ${maxtemp_c1}</p>
  `;

  // ------------------------------------------------ changeAfterNextTempToCelsius

  let temp_c2 = data.forecast.forecastday[2].day.avgtemp_c;
  After__Next__weather__temperature.innerHTML = `
    Average Temperature     
    <br>                             
     °${temp_c2}`;
  let mintemp_c2 = data.forecast.forecastday[2].day.mintemp_c;
  let maxtemp_c2 = data.forecast.forecastday[2].day.maxtemp_c;
  After__Next__weather__minmax.innerHTML = `
  <p>Min:  ° ${mintemp_c2} </p>
  <p>Max:  ° ${maxtemp_c2}</p>
  `;
}

async function changeTemperatureUnitToCelsius(Location) {
  let getWeatherData = await fetchWeatherData(Location);
  changeTempToCelsius(getWeatherData);
}

function changeToC() {
  if (localStorage.getItem("currentCity") != null) {
    changeTemperatureUnitToCelsius(localStorage.getItem("currentCity"));
  } else {
    changeTemperatureUnitToCelsius(Location);
  }
}

async function changeTemperatureUnitToFarenheit(Location) {
  let getWeatherData = await fetchWeatherData(Location);
  changeTempToFarenheit(getWeatherData);
}

function changeToF() {
  if (localStorage.getItem("currentCity") != null) {
    changeTemperatureUnitToFarenheit(localStorage.getItem("currentCity"));
  } else {
    changeTemperatureUnitToFarenheit(Location);
  }
}

// ------------------------------------------------ Some Failed Trials to consider in the future

// function searchWeatherr() {
//   if (weather__searchform.value != "" || weather__searchform.value != null) {
//     var cityArray = weather__searchform.value;
//     localStorage.setItem("currentCity", cityArray);
//     getWeatherData(localStorage.getItem("currentCity"));
//   } else {
//     getWeatherData(localStorage.getItem("giza"));
//   }
// }

// if (
//   localStorage.getItem("currentCity") != "" ||
//   localStorage.getItem("currentCity") != null
// ) {
//   getWeatherData(localStorage.getItem("currentCity"));
// } else {
//   var cityArray = Giza;
//   localStorage.setItem("currentCity", cityArray);
//   getWeatherData(localStorage.getItem("currentCity"));
// }

// async function getWeatherData(Location = "Giza") {
//   let getWeatherData = await fetchWeatherData(Location);
//   displayCurrentDayData(getWeatherData);
//   displayNextDayData(getWeatherData);
// }

// searchWeather.addEventListener("click", function () {
//   var cityArray = weather__searchform.value;
//   currentCity.push(cityArray);
//   getWeatherData(cityArray);
//   localStorage.setItem("cityArray", JSON.stringify(cityArray));
// });

// if (localStorage.getItem("cityArray") != null) {
//   getWeatherData(localStorage.getItem("cityArray"));
// } else {
//   getWeatherData();
// }

// async function getWeatherData(Location = "Giza") {
//   let getWeatherData = await fetchWeatherData(Location);
//   displayCurrentDayData(getWeatherData);
//   displayNextDayData(getWeatherData);
// }

// function changeToF() {
//   if (weather__searchform.value != "") {
//     changeTemperatureUnitToCelsius(weather__searchform.value);
//   } else {
//     changeTemperatureUnitToCelsius();
//   }
//   changeTemperatureUnitToFarenheit(weather__searchform.value);
// }

// async function changeTemperatureUnitToFarenheit(Location = "giza") {
//   let getWeatherData = await fetchWeatherData(Location);
//   changeTempToFarenheit(getWeatherData);
// }

// function changeToF() {
//   changeTemperatureUnitToFarenheit(weather__searchform.value);
//   console.log(weather__searchform.value);
// }

// function changeToC() {
//   if (localStorage.getItem("currentCity") != null) {
//     changeTemperatureUnitToCelsius(localStorage.getItem("currentCity"));
//   } else {
//     changeTemperatureUnitToCelsius();
//   }
// }

// function changeToF() {
//   if (localStorage.getItem("currentCity") != null) {
//     changeTemperatureUnitToFarenheit(localStorage.getItem("currentCity"));
//   } else {
//     changeTemperatureUnitToFarenheit();
//   }
// }

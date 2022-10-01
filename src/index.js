let now = new Date();

let daySelect = document.querySelector("#day");
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
daySelect.innerHTML = days[now.getDay()];

let month = document.querySelector("#month");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
month.innerHTML = months[now.getMonth()];
let dataSelect = document.getElementById("data");
dataSelect.innerHTML = now.getDate();
let hoursSelect = document.querySelector("#hours");
let hours = now.getHours();
if (hours < 10) {
  hoursSelect.innerHTML = `0${hours}`;
} else {
  hoursSelect.innerHTML = `${hours}`;
}
let minutesSelect = document.querySelector("#minutes");
let minutes = now.getMinutes();
if (minutes > 10) {
  minutesSelect.innerHTML = `${minutes}`;
} else {
  minutesSelect.innerHTML = `0${minutes}`;
}
//
function calcFahr(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = Math.round(11 * 1.8 + 32);
}

let temperature = document.querySelector("#fahrenheit-link");
temperature.addEventListener("click", calcFahr);

function calcCelsius(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = Math.round((52 - 32) / 1.8);
}
let temperatures = document.querySelector("#celsius-link");
temperatures.addEventListener("click", calcCelsius);

// d157498ee204d93dde56608fb4800c07

function showWeather(response) {
  let city = response.data.name;
  let cityChoose = document.querySelector("#city");
  cityChoose.innerHTML = `${city}`;

  let currTemp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currTemp.innerHTML = `${temperature}`;
}

function searchCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enterCity");
  let cityChoose = document.querySelector("#city");
  if (enterCity.value) {
    cityChoose.innerHTML = enterCity.value.toUpperCase();
    let apiKey = "d157498ee204d93dde56608fb4800c07";
    let city = enterCity.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  } else {
    cityChoose.innerHTML = null;
    alert(`Please enter a city!`);
  }
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
//

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d157498ee204d93dde56608fb4800c07";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function navigatorLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", navigatorLoc);

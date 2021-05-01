

//format date
function formatDate() {
  let now = new Date();
  return `${
    now.getMonth() + 1
  }/${now.getDate()}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`;
}

//add date to h2
function autoDate() {
  let currentDate = document.querySelector("#date-time");
  currentDate.innerHTML = formatDate();
}
autoDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//update temp with conversion

let fahrenheit = document.querySelector("#fah");
let celsius = document.querySelector("#cel");

celsius.addEventListener("click", toggleC);
fahrenheit.addEventListener("click", toggleF);

function toggleC() {
  event.preventDefault();
  let myTemp = document.querySelector("#cur-temp");
  let celTemperature = Math.round(((fahTemp - 32) * 5) / 9);

  myTemp.innerHTML = `${celTemperature}°`;
  fah.classList.remove("active");
  cel.classList.add("active");
}

function toggleF() {
  event.preventDefault();
  let myTemp = document.querySelector("#cur-temp");
  cel.classList.remove("active");
  fah.classList.add("active");
  myTemp.innerHTML = `${fahTemp}°`;
  
}

function loadVid(status) {
	let bgVideo = document.querySelector("#myVideo");
	key = status.toLowerCase();
	if (key.includes("cloud")) {
    bgVideo.setAttribute(
    "src",
    `media/cloudy.mp4`);
	} else if (key.includes("rain") || key.includes("mist")) {
	bgVideo.setAttribute(
    "src",
    `media/rainy.mp4`);
	} else if (key.includes("clear")) {
	bgVideo.setAttribute(
    "src",
    `media/grassy.mp4`);
	}else if (key.includes("snow")) {
	bgVideo.setAttribute(
    "src",
    `media/snowy.mp4`);
	}
	else if (key.includes("wind")) {
	bgVideo.setAttribute(
    "src",
    `media/windy.mp4`);
	}
}

//update weather to html
function showWeather(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;

  let updatedTemp = document.querySelector("#cur-temp");
  fahTemp = Math.round(response.data.main.temp);
  updatedTemp.innerHTML = `${fahTemp}°`;
  let currentCity = document.querySelector("#def-location");
  let cityName = response.data.name;
  currentCity.innerHTML = cityName;
  let humidWindSpeed = document.querySelector("#humid-wind");
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  humidWindSpeed.innerHTML = `Humidity: ${humidity}%
  Wind: ${wind} MPH`;
  let status = document.querySelector("#def-status");
  let statusMain = response.data.weather[0].main;
  status.innerHTML = statusMain;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(lat, lon);
  loadVid(statusMain);
}


//get current location

let getCurrentLoc = document.querySelector("#current-loc-button");
getCurrentLoc.addEventListener("click", getPosition);

function getPosition(){
	navigator.geolocation.getCurrentPosition(showPosition);
}


function showPosition(position) {
  
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "cb12dde16b4b5750157657ccf03c3f57";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let fahTemp = null;


//search by name

let searchBar = document.querySelector("form");
searchBar.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#search-bar");
  let usersCity = input.value.toLowerCase().trim();
  search(usersCity);
}


function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
        <div class="weather-forecast-date"><strong>${formatDay(forecastDay.dt)}</strong><img
					src="http://openweathermap.org/img/wn/${
					forecastDay.weather[0].icon
					}@2x.png"
					alt=""
					width="42"
					/> ${Math.round(
            forecastDay.temp.max
          )}° </span> /
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span><br/>
</div>
               

  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//retrieve 7 day forecast data
function getForecast(lat, lon){
  let apiKey = "cb12dde16b4b5750157657ccf03c3f57";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function search(city){
  let apiKey = "cb12dde16b4b5750157657ccf03c3f57";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showWeather);
}

//default city
search("San Francisco");

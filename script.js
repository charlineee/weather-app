
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

//convert c/f
function cToF(c) {
  return (c * 9) / 5 + 32;
}
function fToC(f) {
  return ((f - 32) * 5) / 9;
}


//update temp with conversion

let fahrenheit = document.querySelector("#fah");
let celsius = document.querySelector("#cel");

celsius.addEventListener("click", toggleC);
fahrenheit.addEventListener("click", toggleF);

function toggleC() {
  let myTemp = document.querySelector("#cur-temp");
  myTemp.innerHTML = "21°";
}

function toggleF() {
  let myTemp = document.querySelector("#cur-temp");
  myTemp.innerHTML = "70°";
}



//update temperature and city name
function showWeather(response) {

  let updatedTemp = document.querySelector("#cur-temp");
  let temperature = Math.round(response.data.main.temp);
  updatedTemp.innerHTML = `${temperature}°`;
  let currentCity = document.querySelector("#def-location");
  let cityName = response.data.name;
  currentCity.innerHTML = cityName;
  let humidWindSpeed = document.querySelector("#humid-wind");
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  humidWindSpeed.innerHTML = `Humidity: ${humidity}%
  Wind: ${wind} MPH`;
  let status = document.querySelector("#def-status");
  let statusMain = reponse.data.weather[0].description;
  status.innerHTML = statusMain;
 

//update weather status

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
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}



//search by name

let searchBar = document.querySelector("form");
searchBar.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#search-bar");
  let usersCity = input.value.toLowerCase().trim();
  let apiKey = "cb12dde16b4b5750157657ccf03c3f57";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${usersCity}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showWeather);
}





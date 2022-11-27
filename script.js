
function showDate () {
  let now = new Date();
  let span = document.querySelector(".place-span");
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
  ];
  let month = months[now.getMonth()];

  if (hours < 10) {
  hours = `0${hours}`;
  }
  if (minutes < 10) {
  minutes = `0${minutes}`;
  }

  span.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;
}

//----------------//


function showWeather(response) {
  
  let showTemp = document.querySelector('.deg-number');
  let showCity = document.querySelector('.main__place-place');
  let showDescription = document.querySelector('#main__description');
  let showWind = document.querySelector('#main__wind');
  let showHumidity = document.querySelector('#main__humidity');
  let showPressure = document.querySelector('#main__pressure');
  let iconWeather = document.querySelector("#main__img");
  


  showTemp.innerHTML = Math.round(response.data.main.temp);
  showCity.innerHTML = response.data.name;
  showDescription.innerHTML = response.data.weather[0].description;
  showWind.innerHTML = Math.round(response.data.wind.speed);
  showHumidity.innerHTML = response.data.main.humidity;
  showPressure.innerHTML = response.data.main.pressure;
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);


  function showTempFarent (event) {
      event.preventDefault();
      let temp = document.querySelector('.deg-number');    
      temp.innerHTML =  Math.round( response.data.main.temp * 9 / 5 ) + 32;             
  } 
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showTempFarent);  
  
  function showTempCels (event) {
      event.preventDefault();
      let temp = document.querySelector('.deg-number');    
      temp.innerHTML = Math.round(response.data.main.temp);    
  }
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showTempCels);
}


  let apiKey = "961dd11ab08397d71009631978cfd684";
  let units = "metric";
  let cityInput = document.querySelector('#main__input');
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather);



function getPlace(city) {
  let apiKey = "961dd11ab08397d71009631978cfd684";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector('#main__input');
  getPlace(cityInputElement.value);
}

let form = document.querySelector("#form"); 
form.addEventListener("submit", handleSubmit); 

showDate ();
getPlace("London");


//----------------//


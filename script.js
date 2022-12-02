
function showDate () {
  let now = new Date();

  let span = document.querySelector(".place-span");

      let date = now.getDate();
      let hours = now.getHours();
      let minutes = now.getMinutes();      
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

    span.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`; 
  
}


  function showDay (timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",];

    return days[day];
  }
  


//----------------//




 


//----------------//

/*class MenuForecast {
  constructor (dayfor, src, deg__max, deg__min, parentSelector) {
    this.dayfor = dayfor;
    this.src = src;
    this.deg__max = deg__max;
    this.deg__min = deg__min;
    this.parent = document.querySelector(parentSelector);
  }
  render () {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="main__date-item item">
        <div class="main__date-day" id="dayfor">${this.dayfor}</div>
        <div class="main__date-img" id="iconfor"><img src=${this.src} alt="" width="50px"></div>
        <div class="main__date-deg" id="degfor"><span id="deg__max">${this.deg__max}°c </span>  <span id="deg__max"> ${this.deg__min}°c</span></div>
      </div>
    `;
    this.parent.append(element);
  }
}

new MenuForecast (
  'Tuesday',
  '',
  '27',
  '20',
  '.main__date'
) .render();
*/

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".main__date");

  let forecastHTML = `<div class="main__date-item">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="main__date-item item">
              <div class="main__date-day" id="dayfor">${showDay(forecastDay.dt)}</div>
              <div class="main__date-img" id="iconfor"><img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="50px"></div>
              <div class="main__date-deg" id="degfor"><span id="deg__max">${Math.round(
                forecastDay.temp.max
              )}°c</span>  <span id="deg__min">${Math.round(
                forecastDay.temp.min
              )}°c</span></div>
            </div>
        `;
    }
});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}


function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

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

 
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  let celsiusLink = document.querySelector("#celsius-link");

  fahrenheitLink.addEventListener("click", function showTempFarent (event) {
    event.preventDefault();
    let temp = document.querySelector('.deg-number');    
    temp.innerHTML =  Math.round( response.data.main.temp * 9 / 5 ) + 32;   
    fahrenheitLink.style.fontWeight = "600";     
    celsiusLink.style.fontWeight = "300";     
  });  
    
  celsiusLink.addEventListener("click", function showTempCels (event) {
    event.preventDefault();
    let temp = document.querySelector('.deg-number');    
    temp.innerHTML = Math.round(response.data.main.temp);   
    fahrenheitLink.style.fontWeight = "300";     
    celsiusLink.style.fontWeight = "600";   
  });

  getForecast(response.data.coord);
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let units = "metric";
let cityInput = document.querySelector('#main__input');
let city = cityInput.value;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather);



function getPlace(city) {
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
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

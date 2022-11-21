
/*let askCity = prompt('Enter a city?');

let paris =  {
        name: 'Paris',
        temp: Math.round(29.5),        
        humidity: '60%'
    } ;
let tokyo = {
        name: 'Tokyo',
        temp: Math.round(26.1),
        humidity: '66%'
    };
let kiev = {
        name: 'Kiyv',
        temp: Math.round(30.7),
        humidity: '70%' 
    };

let temperatureParis = paris.temp;
let fahreinheitTempParis =  Math.round( temperatureParis * 9 / 5 ) + 32;

let temperatureTokyo = tokyo.temp;
let fahreinheitTempTokyo =  Math.round( temperatureTokyo * 9 / 5 ) + 32;

let temperatureKiyv = kiev.temp;
let fahreinheitTempKiyv =  Math.round( temperatureKiyv * 9 / 5 ) + 32;

if(askCity == 'paris'|| askCity == 'Paris' || askCity == 'PARIS') {
    alert(`It is currently ${paris.temp}°C (${fahreinheitTempParis}°F) in ${paris.name} with a humidity of ${paris.humidity}`);    
}else if(askCity == 'tokyo' || askCity == 'Tokyo' || askCity == 'TOKYO') {
    alert(`It is currently ${tokyo.temp}°C (${fahreinheitTempTokyo}°F) in ${tokyo.name} with a humidity of ${tokyo.humidity}`);
}else if( askCity == 'kiyv' || askCity == 'Kiyv' || askCity == 'KIYV') {
    alert(`It is currently ${kiev.temp}°C (${fahreinheitTempKiyv}°F) in ${kiev.name} with a humidity of ${kiev.humidity}`);
}else {
    alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${askCity}`);
};   */

//----------------------//

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

      span.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

//----------------------//


/*function getPlace (event) {
    event.preventDefault(); 
    let place = document.querySelector('#main__input'); 
    let mainPlace = document.querySelector('.main__place-place');
    //console.log('ok');
    mainPlace.innerHTML = place.value;
    
}
let form = document.querySelector("#form");

form.addEventListener("submit", getPlace);
*/
//----------------------//

//let temperature = 17;

/*function showTempFarent (event) {
    event.preventDefault();
    let temp = document.querySelector('.deg-number');    
    temp.innerHTML = 66;    
}

function showTempCels (event) {
    event.preventDefault();
    let temp = document.querySelector('.deg-number');    
    temp.innerHTML = 19;    
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showTempFarent);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showTempCels);
*/
//----------------------//



function getPlace (event) {
    event.preventDefault(); 

    function showWeather(response) {
    
        let showTemp = document.querySelector('.deg-number');
        let showCity = document.querySelector('.main__place-place');
        
        let temperature = Math.round(response.data.main.temp);
        let city = response.data.name;

        showTemp.innerHTML = temperature;
        showCity.innerHTML = city;

        function showTempFarent (event) {
            event.preventDefault();
            let temp = document.querySelector('.deg-number');    
            temp.innerHTML =  Math.round( temperature * 9 / 5 ) + 32;             
        } 
        let fahrenheitLink = document.querySelector("#fahrenheit-link");
        fahrenheitLink.addEventListener("click", showTempFarent);  
        
        function showTempCels (event) {
            event.preventDefault();
            let temp = document.querySelector('.deg-number');    
            temp.innerHTML = temperature;    
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
   
}
let form = document.querySelector("#form"); 
form.addEventListener("submit", getPlace); 

//------------------------------

function geolocationWeather(event) {
    event.preventDefault();

    function showGeolocationWeather(response) {
       let showTemp = document.querySelector('.deg-number');
        let showCity = document.querySelector('.main__place-place');
        
        let temperature = Math.round(response.data.main.temp);
        let city = response.data.name;

        showTemp.innerHTML = temperature;
        showCity.innerHTML = city;
    }
  
  function retrievePosition(position) {
    let apiKey = "961dd11ab08397d71009631978cfd684";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showGeolocationWeather);
  }
  
  navigator.geolocation.getCurrentPosition(retrievePosition);
  
}
let btnGeo = document.querySelector('.main__seach-btn');
btnGeo.addEventListener('click', geolocationWeather);








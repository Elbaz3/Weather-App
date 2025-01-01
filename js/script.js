import { countries } from "./countries.js";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
const apiKey = '395e276d8d310d8e139d3b829cdd7f6e';

const proplem = document.querySelector(".error");
const result = document.querySelector(".weather");
const temp = document.querySelector(".result .temp");
const countryName = document.querySelector(".result .country-name");
const loc = document.querySelector(".result .location");
const humidity = document.querySelector(".atmosphere .humidity");
const wind = document.querySelector(".atmosphere .wind");
const searchBox = document.querySelector(".search-box input");
const searchIcon = document.querySelector(".search-box .image");
const sky = document.querySelector(".board img");

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    
    if (response.status === 404) {
        proplem.style.display = "block";
        result.style.display = "none";

    } else {
        let data = response.json();
        data.then((data) => {
            temp.innerHTML = Math.floor(data.main.temp) + "°c";
            countryName.innerHTML = data.name;
            loc.innerHTML = "Loc: " + countries[data.sys.country];
            humidity.innerHTML = data.main.humidity + "%";
            wind.innerHTML = data.wind.speed + " Km/h"
            
            if (data.weather[0].main == "Clouds") {
                sky.src = "images/clouds.png";
            }
            else if (data.weather[0].main == "Clear") {
                sky.src = "images/clear.png";
            }
            else if (data.weather[0].main == "Rain") {
                sky.src = "images/rain.png";
            }
            else if (data.weather[0].main == "Drizzle") {
                sky.src = "images/drizzle.png";
            }
            else if (data.weather[0].main == "Mist") {
                sky.src = "images/mist.png";
            }
            else if (data.weather[0].main == "Fog") {
                sky.src = "images/fog.png";
            }
            proplem.style.display = "none";
            result.style.display = "block";
    })

    }
    
}

searchIcon.addEventListener("click", (e) => {
    if (searchBox.value) {
        

        checkWeather(searchBox.value);
        searchBox.value = "";
    }
})


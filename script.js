const searchField = document.querySelector('#search');
const submitButton = document.querySelector('input[type=submit]');
const skyDiv = document.querySelector('.sky');
const tempDiv = document.querySelector('.temp');
const windDiv = document.querySelector('.wind');
const tempSwitch = document.querySelector('#tempswitch');
const locationTitle = document.querySelector('.location');


async function getCityForecast() {
    try {
        const searchTerm = searchField.value;
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=280ce5c26594bc7d59eb30e9d8d85641`, { mode: 'cors' })
        const weatherData = await response.json();
        return {
            description: weatherData.weather[0].description,
            temperature: weatherData.main.temp,
            wind: weatherData.wind.speed
        }
    } catch (error) {
        console.log(error);
    }

};

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    getCityForecast();
    displayWeather();
});


async function displayWeather() {
    try {
        const description = (await getCityForecast()).description;
        const temp = (await getCityForecast()).temperature;
        const wind = (await getCityForecast()).wind;
        skyDiv.innerHTML = description;
        tempDiv.innerHTML = `${convertKelvinToCelsius(temp)}°C`;
        windDiv.innerHTML = `Wind: ${wind} m/s`;
        locationTitle.textContent = searchField.value;
    } catch (error) {
        console.log(error);
    }
}

function convertFahrenheitToCelsius(temp) {
    const fTemp = temp;
    const cTemp = (fTemp - 32) * 5 / 9;
    return Math.round((cTemp + Number.EPSILON) * 10) / 10;
}

function convertCelsiusToFahrenheit(temp) {
    const cTemp = temp;
    const fTemp = cTemp * 9 / 5 + 32;
    return Math.round((fTemp + Number.EPSILON) * 10) / 10;
}

function convertKelvinToFahrenheit(temp) {
    const kTemp = temp;
    const fTemp = ((kTemp - 273.15) * 1.8) + 32;
    return Math.round((fTemp + Number.EPSILON) * 10) / 10;
}

function convertKelvinToCelsius(temp) {
    const kTemp = temp;
    const cTemp = temp - 273.15;
    return Math.round((cTemp + Number.EPSILON) * 10) / 10;
}

tempSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
        const currentTemp = Number(tempDiv.textContent.split('°')[0]);
        const convertedTemp = convertCelsiusToFahrenheit(currentTemp);
        tempDiv.textContent = `${convertedTemp}°F`;
    }
    else if (!e.target.checked) {
        const currentTemp = Number(tempDiv.textContent.split('°')[0]);
        const convertedTemp = convertFahrenheitToCelsius(currentTemp);
        tempDiv.textContent = `${convertedTemp}°C`;
    }
})

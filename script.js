const searchField = document.querySelector('#search');
const submitButton = document.querySelector('input[type=submit]');
const skyDiv = document.querySelector('.sky');
const tempDiv = document.querySelector('.temp');
const windDiv = document.querySelector('.wind');
const tempSwitch = document.querySelector('#tempswitch');


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


async function displayWeather() {
    try {
        skyDiv.innerHTML = (await getCityForecast()).description;
        tempDiv.innerHTML = (await getCityForecast()).temperature;
        windDiv.innerHTML = (await getCityForecast()).wind;
    } catch (error) {
        console.log(error);
    }
}

function convertFahrenheitToCelsius(temp) {
    const fTemp = temp;
    const cTemp = (fTemp - 32) * 5 / 9;
    return cTemp;
}

function convertCelsiusToFahrenheit(temp) {
    const cTemp = temp;
    const fTemp = cTemp * 9 / 5 + 32;
    return fTemp;
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    getCityForecast();
    displayWeather();
});

tempSwitch.addEventListener('change', () => {
    console.log(this);
})
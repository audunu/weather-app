const searchField = document.querySelector('#search');
const submitButton = document.querySelector('input[type=submit]');
const mainDiv = document.querySelector('.main');



async function getCityForecast() {
    const searchTerm = searchField.value;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&APPID=280ce5c26594bc7d59eb30e9d8d85641`, { mode: 'cors' })
    const weatherData = await response.json();
    return {
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp,
        wind: weatherData.wind.speed,    
    }

    };

getCityForecast();

/* submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    getCityForecast();
});
 */

function displayWeather() {
    mainDiv.innerHTML = getCityForecast().description;
}

displayWeather();
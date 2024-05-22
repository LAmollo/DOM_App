const cityInput = document.getElementById('cityInput');
const submitBtn = document.getElementById('submitBtn');
const weatherForm = document.getElementById('weatherForm');
const errorDiv = document.getElementById('errorDiv');

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city !== '') {
        fetchWeather(city);
    } else {
        displayError('Please enter a city name.');
    }
});

function fetchWeather(city) {
    const apiKey = 'API KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })

        .then(data => {
            displayWeather(data);
            setWeatherBackground(data.weather[0].main);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError('City not found. Please enter a valid city name.');
        });
}

function displayWeather(data) {
    const weatherInfoContainer = document.getElementById('weatherInfo');
    weatherInfoContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p id="temperature">Temperature: ${data.main.temp}°C</p>
        <p id="weather">Weather: ${data.weather[0].description}</p>
        <p id="humidity">Humidity: ${data.main.humidity}%</p>
        <p id="wind-speed">Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    errorDiv.textContent = message;
    setTimeout(() => {
        errorDiv.textContent = '';
    }, 3000);
}

function setWeatherBackground(weather) {
    const body = document.body;
    body.classList.remove('sunny', 'cloudy', 'rainy');
    switch (weather) {
        case 'Clear':
            body.classList.add('sunny');
            break;
        case 'Clouds':
            body.classList.add('cloudy');
            break;
        case 'Rain':
            body.classList.add('rainy');
            break;
        default:
            // Do nothing for other weather conditions
            break;
    }
}

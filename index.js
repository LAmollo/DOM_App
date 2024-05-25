const cityInput = document.getElementById('cityInput');  // Get references to HTML elements
const submitBtn = document.getElementById('submitBtn');
const weatherForm = document.getElementById('weatherForm');
const errorDiv = document.getElementById('errorDiv');

weatherForm.addEventListener('submit', function(event) { // Add event listener to the form for submitting city weathe
    event.preventDefault();  // Prevent form submission from refreshing the page


    const city = cityInput.value.trim(); // Get the value of the city input field and trim any trailing whitespaces

    if (city !== '') {    // Check if the city input is not empty
        fetchWeather(city);  // If city is provided, fetch weather data for that city
    } else {
        displayError('Please enter a city name.'); // If city input is empty, display an error message
    }
});

function fetchWeather(city) {  // Function to fetch weather data from OpenWeatherMap API
    const apiKey = '0ce3ad64e1e026ca8eae0a7e795ae30e';
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

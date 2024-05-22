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

  
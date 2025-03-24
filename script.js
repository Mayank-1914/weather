
const apiKey = '245dfedc88a8bb9b7f6d7b5f56841aad';

document.getElementById('search-button').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) {
    getCurrentWeather(city);
    getForecast(city);
  } else {
    alert('Please enter a city name');
  }
});

// Function to fetch and display current weather data
function getCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherContainer = document.getElementById('weather-container');
      weatherContainer.innerHTML = `
        <h2>Current Weather in ${city}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Description: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
    })
    .catch(() => {
      alert('Error fetching current weather data. Please try again.');
    });
}

// Function to fetch and display 5-day forecast data
function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const forecastContainer = document.getElementById('forecast-container');
      let forecastHTML = `<h2>5-Day Forecast for ${city}</h2>`;

      data.list.forEach((entry, index) => {
        if (index % 8 === 0) { // Show one entry per day (8 data points per day)
          forecastHTML += `
            <div>
              <p>Date: ${entry.dt_txt}</p>
              <p>Temperature: ${entry.main.temp}°C</p>
              <p>Description: ${entry.weather[0].description}</p>
            </div>
          `;
        }
      });

      forecastContainer.innerHTML = forecastHTML;
    })
    .catch(() => {
      alert('Error fetching forecast data. Please try again.');
    });
}

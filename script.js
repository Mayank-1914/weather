const apiKey = "245dfedc88a8bb9b7f6d7b5f56841aad";  

// Function to get current weather and 5-day forecast
async function getWeather(city) {
    try {
        // Fetch current weather data
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const currentWeatherData = await currentWeatherResponse.json();

        // Check if city is valid
        if (currentWeatherData.cod !== 200) {
            alert("City not found. Please try again.");
            return;
        }

        // Display current weather data
        document.getElementById("temp").textContent = `Temperature: ${currentWeatherData.main.temp}°C`;
        document.getElementById("description").textContent = `Description: ${currentWeatherData.weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${currentWeatherData.main.humidity}%`;
        document.getElementById("wind").textContent = `Wind Speed: ${currentWeatherData.wind.speed} m/s`;

        // Fetch 5-day forecast data
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();

        // Display 5-day forecast data
        const forecastCards = document.getElementById("forecastCards");
        forecastCards.innerHTML = "";  // Clear previous forecast

        forecastData.list.filter((item, index) => index % 8 === 0).forEach((item) => {
            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-card");
            forecastCard.innerHTML = `
                <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
                <p>${item.main.temp}°C</p>
                <p>${item.weather[0].description}</p>
            `;
            forecastCards.appendChild(forecastCard);
        });
    } catch (error) {
        alert("Error fetching weather data.");
        console.error(error);
    }
}

// Event listener for search button
document.getElementById("searchButton").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city.");
    }
});

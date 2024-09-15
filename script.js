document
	.getElementById("fetch-weather-btn")
	.addEventListener("click", fetchWeather);

window.onload = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				fetchWeatherByCoords(
					position.coords.latitude,
					position.coords.longitude
				);
			},
			() => {
				console.log("Geolocation not enabled or available.");
			}
		);
	}
};

function fetchWeather() {
	const location = document.getElementById("location-input").value.trim();
	if (location) {
		fetchWeatherData(`q=${location}`);
	} else {
		alert("Please enter a location.");
	}
}

function fetchWeatherByCoords(lat, lon) {
	fetchWeatherData(`lat=${lat}&lon=${lon}`);
}

function fetchWeatherData(query) {
	const apiKey = "fbf59fda44d302ff5c5508eb960a8c6f";
	const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.cod === 200) {
				displayWeather(data);
			} else {
				alert("Location not found!");
			}
		})
		.catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeather(data) {
	document.getElementById("location-name").innerText = data.name;
	document.getElementById(
		"temperature"
	).innerText = `Temperature: ${data.main.temp}°C`;
	document.getElementById(
		"weather-description"
	).innerText = `Description: ${data.weather[0].description}`;
	document.getElementById(
		"humidity"
	).innerText = `Humidity: ${data.main.humidity}%`;
	document.getElementById(
		"wind-speed"
	).innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

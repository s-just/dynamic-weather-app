import { useState } from "react";

// Component to display current weather icon
function WeatherIcon({ weatherData }) {
  // If weatherData or weatherData.icon does not exist, use a default placeholder icon.
  const iconSrc =
    weatherData && weatherData.icon
      ? `https://openweathermap.org/img/wn/${weatherData.icon}.png`
      : "http://openweathermap.org/img/wn/50d@2x.png";

  return (
    <div className="currentWeatherIco">
      <img src={iconSrc} width="50" height="50" alt="weather icon"></img>
    </div>
  );
}
// TopBar component for user inputs and displaying current weather icon
export function TopBar({ onFetchData, weatherData }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Update inputValue state when user types into input field
  const handleInputChange = (event) => setInputValue(event.target.value);

  // Fetch data for the location inputted by user
  const handleFetchData = async () => {
    setIsLoading(true); // Set loading to true to disable the button
    await onFetchData(inputValue);
    setTimeout(() => setIsLoading(false), 1000); // Re-enable the button after 1 second
  };

  // Get user's current position and fetch data for that location
  const handleLocationButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        onFetchData(`${latitude},${longitude}`);
      });
    } else {
      alert("Geolocation is not supported.");
    }
  };

  return (
    <div className="topBar">
      <div className="inputContainer">
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ex. London"
        />
        <button onClick={handleFetchData} disabled={isLoading}>
          {isLoading ? "Loading..." : ">"}
        </button>
        <button onClick={handleLocationButtonClick}>Use My Location</button>
      </div>
      <WeatherIcon weatherData={weatherData} />
    </div>
  );
}

// Importing required dependencies and components
import "./App.css";
import { FetchWeatherData, FetchForecastData } from "./weatherApi";
import { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";

// Main App component
function App() {
  // Initial state declarations
  const [rootForecastDataState, setRootForecastDataState] = useState(null);
  const [rootWeatherDataState, setRootWeatherDataState] = useState(null);
  const [weatherBgState, setWeatherBgState] = useState("nodata-cropped.png");
  const [weatherDataState, setWeatherDataState] = useState(null);
  const [mainDataState, setMainDataState] = useState(null);

  // Fetching weather and forecast data on initial render
  useEffect(() => {
    (async () => {
      const data = await FetchWeatherData();
      const forecastData = await FetchForecastData();
      if (data) {
        setRootWeatherDataState(data);
      }
      if (forecastData) {
        setRootForecastDataState(forecastData);
      }
    })();
  }, []);

  // Updating weather data state when rootWeatherDataState changes
  useEffect(() => {
    if (
      rootWeatherDataState?.weather &&
      rootWeatherDataState.weather.length > 0
    ) {
      let bgType = GetWeatherBackgroundPath(
        rootWeatherDataState.weather[0].main
      );
      setWeatherBgState(bgType);
      setWeatherDataState(rootWeatherDataState.weather[0]);
      setMainDataState(rootWeatherDataState.main);
    }
  }, [rootWeatherDataState]);

  // Render the main component
  return (
    <div className="App">
      <div
        className="weatherBox"
        style={{ backgroundImage: `url(${weatherBgState})` }}
      >
        <TopBar
          onFetchData={async (locationString) => {
            const data = await FetchWeatherData(locationString);
            const forecastData = await FetchForecastData(locationString);
            if (data) {
              setRootWeatherDataState(data);
            }
            if (forecastData) {
              setRootForecastDataState(forecastData);
            }
          }}
          weatherData={weatherDataState}
        />
        <WeatherBar rootData={rootWeatherDataState} mainData={mainDataState} />
        <FutureWeatherBar forecastData={rootForecastDataState} />
      </div>
    </div>
  );
}

// WeatherBar component to display current weather
function WeatherBar(props) {
  if (!props.mainData || !props.rootData) {
    return (
      <div className="currentWeatherBar">
        <div className="currentLocation">Unknown</div>
        <div>{"-99°C | -99°F"}</div>
      </div>
    );
  }

  let celsius = props.mainData?.temp - 273.15;
  let farenheit = celsius * 1.8 + 32;
  return (
    <div className="currentWeatherBar">
      <div className="currentLocation">{props.rootData?.name}</div>
      <div>
        {celsius.toFixed(1).toString() +
          "°C | " +
          farenheit.toFixed(1).toString() +
          "°F"}
      </div>
    </div>
  );
}

// FutureWeatherBar component to display weather forecast
function FutureWeatherBar({ forecastData }) {
  // if data is not yet loaded, return a placeholder or nothing
  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  // Take the first 6 entries of the forecast list
  const shortTermForecast = forecastData.list.slice(0, 6);

  return (
    <div className="futureWeatherBar">
      {shortTermForecast.map((weatherData, index) => (
        <ForecastWeatherIcon weatherData={weatherData} key={index} />
      ))}
    </div>
  );
}

// ForecastWeatherIcon component to display icon for forecast weather
function ForecastWeatherIcon({ weatherData }) {
  let iconSrc = weatherData.weather[0].icon
    ? "https://openweathermap.org/img/wn/" +
      weatherData.weather[0].icon +
      ".png"
    : "http://openweathermap.org/img/wn/50d@2x.png";

  let date = new Date(weatherData.dt * 1000);

  let celsius = weatherData.main.temp - 273.15;
  let fahrenheit = celsius * 1.8 + 32;

  return (
    <div className="forecastWeatherIco-container">
      <div className="futureWeatherIco">
        <div>{`${date.getHours()}:00`}</div>
        <img src={iconSrc} width="50" height="50" alt="weather-icon" />
        <div>{`${celsius.toFixed(0)}°C | ${fahrenheit.toFixed(0)}°F`}</div>
      </div>
    </div>
  );
}

// Function to get background image path based on weather condition
function GetWeatherBackgroundPath(bg_value) {
  switch (bg_value) {
    case "Clouds":
      return "cloudy-cropped.png";
    case "Clear":
      return "sun-cropped.png";
    case "Snow":
      return "snow-cropped.png";
    case "Rain":
      return "rainy-cropped.png";
    case "Drizzle":
      return "rainy-cropped.png";
    case "Thunderstorm":
      return "storm-cropped.png";
    default:
      return "nodata-cropped.png";
  }
}
export default App;

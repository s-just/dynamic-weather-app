import "./App.css";
import { FetchWeatherData, FetchForecastData } from "./weatherApi";
import { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";

function App() {
  const [rootForecastDataState, setRootForecastDataState] = useState(null);

  const [rootWeatherDataState, setRootWeatherDataState] = useState(null);
  const [weatherBgState, setWeatherBgState] = useState("nodata-cropped.png");
  const [weatherDataState, setWeatherDataState] = useState(null);
  const [mainDataState, setMainDataState] = useState(null);

  useEffect(() => {
    (async () => {
      const forecastData = await FetchForecastData();
      if (forecastData) {
        console.log(forecastData);
        setRootForecastDataState(forecastData);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await FetchWeatherData();
      if (data) {
        console.log(data);
        setRootWeatherDataState(data); //When mounting load London's data as the default.
      }
    })();
  }, []);

  useEffect(() => {
    if (
      rootWeatherDataState?.weather &&
      rootWeatherDataState.weather.length > 0
    ) {
      console.log("Weather is not null, updating weather state data.");
      let bgType = GetWeatherBackgroundPath(
        rootWeatherDataState.weather[0].main
      );
      console.log("Value retrieved from GetWeatherBackgroundPath: " + bgType);
      setWeatherBgState(bgType);
      setWeatherDataState(rootWeatherDataState.weather[0]);
      setMainDataState(rootWeatherDataState.main);
    } else {
      console.log("Error: Failed to fetch any weather data.");
    }
  }, [rootWeatherDataState]);

  useEffect(() => {
    console.log("Current value of weatherBgState: " + weatherBgState);
  }, [weatherBgState]);

  return (
    <div className="App">
      <div
        className="weatherBox"
        style={{ backgroundImage: `url(${weatherBgState})` }}
      >
        <TopBar
          onFetchData={async (locationString) => {
            const data = await FetchWeatherData(locationString);
            if (data) {
              setRootWeatherDataState(data);
              console.log(data);
            }
          }}
          weatherData={weatherDataState}
        />
        <WeatherBar rootData={rootWeatherDataState} mainData={mainDataState} />
        <FutureWeatherBar />
      </div>
    </div>
  );
}

function WeatherBar(props) {
  if (!props.mainData || !props.rootData) {
    return (
      <div className="currentWeatherBar">
        <div className="currentLocation">Unknown</div>
        <div>{"-99°C | -99°F"}</div>
      </div>
    ); // Missing Data, utilize placeholder
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

function FutureWeatherBar(props) {
  return (
    <div className="futureWeatherBar">
      {GetDetailedWeatherIco()}
      {GetDetailedWeatherIco()}
      {GetDetailedWeatherIco()}
      <div className="weatherDivider">|</div>
      {GetDetailedWeatherIco()}
      {GetDetailedWeatherIco()}
      {GetDetailedWeatherIco()}
    </div>
  );
}

function GetDetailedWeatherIco() {
  return (
    <div className="currentWeatherIcoDetailed">
      5/28
      <img
        src="https://cdn-icons-png.flaticon.com/512/169/169367.png"
        width="50"
        height="50"
      ></img>
      72
    </div>
  );
}

function GetWeatherBackgroundPath(bg_value) {
  switch (bg_value) {
    case "Clouds":
      return "cloudy-cropped.png";
    case "Clear":
      return "sun-cropped.png";
    case "Snow":
      return "snow-cropped.png";
    case "Rain":
      console.log("Setting bg to rain");
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

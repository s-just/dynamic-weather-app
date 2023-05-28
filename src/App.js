import "./App.css";
import { FetchWeatherData } from "./weatherApi";
import { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";
//http://api.openweathermap.org/data/2.5/weather?q=London&appid=YOURKEY

function App() {
  const [weatherState, setWeatherState] = useState(null);
  const [weatherBgState, setWeatherBgState] = useState("");
  const [weatherIcoState, setWeatherIcoState] = useState("");

  useEffect(() => {
    (async () => {
      const data = await FetchWeatherData();
      if (data) {
        setWeatherState(data);
        console.log(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (
      weatherState?.weather &&
      weatherState.weather.length > 0 &&
      weatherState.weather[0].main === "Clouds"
    ) {
      console.log("Weather is cloudy.");
      setWeatherBgState("cloudy-cropped.png");
      setWeatherIcoState("Clouds");
      console.log("Weather icon set to: " + weatherIcoState);
    }
  }, [weatherState]);

  return (
    <div className="App">
      <div
        className="weatherBox"
        style={{ backgroundImage: `url(${weatherBgState})` }}
      >
        <TopBar
          onFetchData={async () => {
            const data = await FetchWeatherData();
            if (data) {
              setWeatherState(data);
              console.log(data);
            }
          }}
          weatherIcon={weatherIcoState}
        />
        <WeatherBar />
        <FutureWeatherBar />
      </div>
    </div>
  );
}

function WeatherBar(props) {
  return (
    <div className="currentWeatherBar">
      <div className="currentLocation">London</div>
      <div>72°</div>
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

export default App;

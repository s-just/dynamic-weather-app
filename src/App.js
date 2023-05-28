import "./App.css";
import { FetchWeatherData } from "./weatherApi";
import { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";

function App() {
  const [rootDataState, setRootDataState] = useState(null);
  const [weatherBgState, setWeatherBgState] = useState("");
  const [weatherDataState, setWeatherDataState] = useState(null);
  const [mainDataState, setMainDataState] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await FetchWeatherData();
      if (data) {
        setRootDataState(data);
        console.log(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (rootDataState?.weather && rootDataState.weather.length > 0) {
      console.log("Weather is not null, updating weather state data.");
      setWeatherBgState("cloudy-cropped.png");
      setWeatherDataState(rootDataState.weather[0]);
      setMainDataState(rootDataState.main);
    }
  }, [rootDataState]);

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
              setRootDataState(data);
              console.log(data);
            }
          }}
          weatherData={weatherDataState}
        />
        <WeatherBar rootData={rootDataState} mainData={mainDataState} />
        <FutureWeatherBar />
      </div>
    </div>
  );
}

function WeatherBar(props) {
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

export default App;

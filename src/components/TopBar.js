import { useState } from "react";
function GetWeatherIco(weatherData) {
  // If weatherData or weatherData.icon does not exist, use a default placeholder icon.
  let iconSrc =
    weatherData && weatherData.icon
      ? "https://openweathermap.org/img/wn/" + weatherData.icon + ".png"
      : "http://openweathermap.org/img/wn/50d@2x.png";

  return (
    <div className="currentWeatherIco">
      <img src={iconSrc} width="50" height="50"></img>
    </div>
  );
}

export function TopBar(props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="topBar">
      <div className="inputContainer">
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ex. London"
        />{" "}
        <button onClick={() => props.onFetchData(inputValue)}> {">"} </button>
      </div>
      {GetWeatherIco(props.weatherData)}
    </div>
  );
}

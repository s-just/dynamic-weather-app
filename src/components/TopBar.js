import { useState } from "react";

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
      {props.weatherData && GetWeatherIco(props.weatherData)}
    </div>
  );
}

//https://cdn-icons-png.flaticon.com/512/1163/1163661.png

function GetWeatherIco(weatherData) {
  let iconSrc =
    "https://openweathermap.org/img/wn/" + weatherData?.icon + ".png";
  return (
    <div className="currentWeatherIco">
      <img src={iconSrc} width="50" height="50"></img>
    </div>
  );
}

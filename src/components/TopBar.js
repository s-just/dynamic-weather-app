export function TopBar(props) {
  return (
    <div className="topBar">
      <div className="inputContainer">
        <input placeholder="Ex. London" />{" "}
        <button onClick={props.onFetchData}> {">"} </button>
      </div>
      {GetWeatherIco(props.weatherIcon)}
    </div>
  );
}

//https://cdn-icons-png.flaticon.com/512/1163/1163661.png

function GetWeatherIco(weatherIcoType) {
  let iconSrc = "";

  switch (weatherIcoType) {
    case "Clouds":
      iconSrc = "https://openweathermap.org/img/wn/03d.png"; // URL of cloud icon
      break;
    case "Sunny":
      iconSrc = "";
      break;
    default:
      iconSrc = "";
  }

  return (
    <div className="currentWeatherIco">
      <img src={iconSrc} width="50" height="50"></img>
    </div>
  );
}

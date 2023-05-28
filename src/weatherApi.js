import Axios from "axios";

//https://api.openweathermap.org/data/2.5/forecast?q=London&appid=YOURKEY

export async function FetchWeatherData(locationString = "") {
  if (locationString === "") {
    console.log("No input string, using London as default for weather.");
    locationString = "London";
  }
  try {
    const res = await Axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${locationString}&appid=YOURKEY`
    );
    const weatherData = res.data;
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    return null;
  }
}

export async function FetchForecastData(locationString = "") {
  if (locationString === "") {
    console.log("No input string, using London as default for forecast.");
    locationString = "London";
  }
  try {
    const res = await Axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${locationString}&appid=YOURKEY`
    );
    const forecastData = res.data;
    return forecastData;
  } catch (error) {
    console.error("Error fetching forecast data: ", error);
    return null;
  }
}

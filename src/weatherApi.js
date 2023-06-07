import Axios from "axios";

// Fetch current weather data from OpenWeatherMap
export const FetchWeatherData = async (locationString = "London") => {
  try {
    const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(
      locationString
    );
    const url = isCoordinates
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${
          locationString.split(",")[0]
        }&lon=${locationString.split(",")[1]}&appid=${
          process.env.REACT_APP_WEATHER_API_KEY
        }`
      : `https://api.openweathermap.org/data/2.5/weather?q=${locationString}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

    const res = await Axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    return null;
  }
};

// Fetch forecast weather data from OpenWeatherMap
export const FetchForecastData = async (locationString = "London") => {
  try {
    const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(
      locationString
    );
    const url = isCoordinates
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${
          locationString.split(",")[0]
        }&lon=${locationString.split(",")[1]}&appid=${
          process.env.REACT_APP_WEATHER_API_KEY
        }`
      : `https://api.openweathermap.org/data/2.5/forecast?q=${locationString}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

    const res = await Axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching forecast data: ", error);
    return null;
  }
};

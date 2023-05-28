import Axios from "axios";

//https://api.openweathermap.org/data/2.5/forecast?q=London&appid=YOURKEY

export async function FetchWeatherData(locationString = "") {
  if (locationString === "") {
    console.log("No input string, using London as default.");
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

    if (error.response && error.response.status === 401) {
      console.error(
        "Authentication error: Please check your API key or login credentials."
      );
    }

    // TODO: Handle other errors.
    //throw error;
  }
}

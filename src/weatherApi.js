import Axios from "axios";

export async function FetchWeatherData() {
  try {
    const res = await Axios.get(
      "http://api.openweathermap.org/data/2.5/weather?q=London&appid=YOURKEY"
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

import axios from "axios";

export async function GetLocation() {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.REACT_APP_GEOLOCATION_KEY}`
    );
    const { city } = await res.json();
    return city?.name;
  } catch (error) {
    return undefined;
  }
}

export const GetWeather = async (location) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_KEY}`;

    const response = await axios.get(url);
    const { coord } = response.data;

    const lat = coord.lat;
    const lon = coord.lon;

    const secondApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`;

    const data = await axios.get(secondApiUrl);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

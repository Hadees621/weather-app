import React, { useEffect, useState } from "react";
import { GetLocation, GetWeather } from "../services";

function HourlyWeather({ forcast }) {
  return (
    <div class="hourly my-2 d-flex overflow-scroll pb-3">
      {forcast.map((hour, i) => {
        return (
          <div className="mx-2 shadow rounded d-flex flex-column justify-content-center align-items-center px-4 py-2">
            <h6>{hour.dt_txt.split(" ")[1]}</h6>
            <img
              src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
              alt=""
            />
            <p className="mb-0">{hour.main.temp.toFixed()} F</p>
          </div>
        );
      })}
    </div>
  );
}
function WeeklyWeather({ loggedIn, day }) {
  let dtDate = new Date(day[0].dt_txt);
  let dayOfWeek = dtDate.toLocaleString("en-US", { weekday: "long" });

  return (
    <>
      <div class="week mx-2 my-3 shadow rounded d-flex justify-content-between align-items-center px-3 py-3">
        <h4 className="mb-0">{dayOfWeek}</h4>
        <div className="d-flex">
          <img
            src={`http://openweathermap.org/img/w/${day[0].weather[0]?.icon}.png`}
            alt=""
          />
          <div>
            <p className="mb-0 text-center">{day[0].main.temp.toFixed()} F</p>
            <p className="mb-0 text-center">{day[0].weather[0]?.main}</p>
          </div>
        </div>
      </div>
      {loggedIn && <HourlyWeather forcast={day} />}
    </>
  );
}
function Weather({ searchQuery, loggedIn = false }) {
  const [weather, setWeather] = useState({});
  const [forcast, setForcast] = useState(null);

  const populateWeather = async (city) => {
    const response = await GetWeather(city);
    const list = response.data?.list;

    setWeather({
      city: response.data.city.name,
      weather: {
        ...response.data.list[0].weather[0],
        temp: response.data.list[0].main,
      },
    });

    const payload = [
      [...list.slice(0, 7)],
      [...list.slice(8, 15)],
      [...list.slice(16, 23)],
      [...list.slice(24, 31)],
      [...list.slice(32, 39)],
    ];

    setForcast(payload);
  };
  const searchWeatherByCity = async () => {
    await populateWeather(searchQuery);
  };

  const getLocation = async () => {
    const city = await GetLocation();
    await populateWeather(city);
  };
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      searchWeatherByCity();
    }
  }, [searchQuery]);

  return (
    <div>
      {Object.keys(weather).length > 0 ? (
        <>
          <div class="row mt-3">
            <div class="col-4 d-flex justify-content-center align-items-center flex-column">
              <h4 className="text-white text-center mb-0">
                {weather?.city} {weather?.weather?.temp?.temp.toFixed()}°F
              </h4>
              <p className="text-white text-center mb-0">
                Feels Like {weather?.weather?.temp?.feels_like.toFixed()}°F
              </p>
            </div>
            <div class="col-4 d-flex flex-column justify-content-center align-items-center">
              <img
                src={`http://openweathermap.org/img/w/${weather?.weather?.icon}.png`}
                alt=""
              />

              <p className="text-white text-center">{weather?.weather?.main}</p>
            </div>
            <div class="col-4 d-flex justify-content-center align-items-center">
              <div className="mx-1">
                <p className="text-white text-center mb-0">Humidity </p>
                <p className="text-white text-center mb-0">
                  {weather?.weather?.temp?.humidity}{" "}
                </p>
              </div>

              <div className="mx-1">
                <p className="text-white text-center mb-0">Pressure </p>
                <p className="text-white text-center mb-0">
                  {weather?.weather?.temp?.pressure}{" "}
                </p>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12 overflow-scroll week-container">
              {forcast?.map((day, idx) => {
                return (
                  <WeeklyWeather key={idx} day={day} loggedIn={loggedIn} />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div class="w-100 h-100 d-flex justify-content-center align-items-center">
          {" "}
          <h6 className="text-white mt-5">No Weather to Show</h6>
        </div>
      )}
    </div>
  );
}

export default Weather;

import React, { useState } from 'react';
import './Weather.css';
import { BiCloud, BiSearch, BiSun } from 'react-icons/bi';
import { WiHumidity, WiRain, WiWindy } from 'react-icons/wi';
import { TbTemperature } from 'react-icons/tb';
import Map from '../../assets/OIP.jpeg';
import { LuHaze } from 'react-icons/lu';
import { CiLocationOn } from 'react-icons/ci';

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false); // New state for search button click
  const apikey = "65f7b612e3b7902c807bca207f229519";

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`);
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        console.log('Weather Data:', data);
      } else {
        console.error('City not found');
        setWeather(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
    }
    setLoading(false);
  };

  const getCurrentWeatherData = () => {
    if (!weather) return {};
    const { list, city } = weather;
    return {
      temperature: list[0].main.temp.toFixed(2),
      windspeed: list[0].wind.speed,
      humidity: list[0].main.humidity,
      weather: list[0].weather[0].main,
      tempMin: list[0].main.temp_min,
      tempMax: list[0].main.temp_max,
    };
  };

  const getFiveDayForecast = () => {
    if (!weather) return [];
    return weather.list.slice(1).filter((_, index) => index % 8 === 0).slice(0, 5).map((forecast, index) => {
      const date = new Date(forecast.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temperature = forecast.main.temp.toFixed(2);
      const weatherType = forecast.weather[0].main;
      const Icon = getWeatherIcon(weatherType);
      return { dayName, temperature, Icon };
    });
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear': return BiSun;
      case 'Clouds': return BiCloud;
      case 'Rain': return WiRain;
      case 'Haze': return LuHaze;
      default: return BiCloud;
    }
  };

  const currentWeatherData = getCurrentWeatherData();
  const fiveDayForecast = getFiveDayForecast();
  const WeatherIcon = getWeatherIcon(currentWeatherData.weather);

  return (
    <div className='weather_container'>
      {!searchClicked ? (
        <div className='search_button'>
          <BiSearch className='fa_search' onClick={() => setSearchClicked(true)} />
        </div>
      ) : (
        <div className='weather_content'>
          <div className="weather_navbar">
            <h2>Weather App</h2>
            <div className="weather_search">
              <input
                type="text"
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <BiSearch onClick={() => { fetchWeather(); }} />
            </div>
            <div className="location_geotagging">
              <CiLocationOn className='fa_location' />
              {weather && <p>{weather.city.name}, {weather.city.country}</p>}
            </div>
          </div>

          {loading && <p className='loading'>Loading...</p>}

          {weather && !loading && (
            <div className="weather_info">
              <div className="left_side">
                <div className="last_5_days">
                  <p>Next 5 Days Weather</p>
                  <div className="days">
                    {fiveDayForecast.map((forecast, index) => (
                      <div className="day" key={index}>
                        <p>{forecast.dayName}</p>
                        <forecast.Icon className='fa' />
                        <p>{forecast.temperature}°C</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="map">
                  <img src={Map} alt="Map" />
                  <p>Point a place</p>
                </div>
              </div>
              <div className="right_side">
                <p className="city_name">{weather.city.name}</p>
                <h2>{currentWeatherData.temperature}°C</h2>
                <div className="weather_details">
                  <div className="attribute">
                    <WeatherIcon className='fa' />
                    <p>Weather: {currentWeatherData.weather}</p>
                  </div>
                  <div className="attribute">
                    <WiHumidity className='fa' />
                    <p>Humidity: {currentWeatherData.humidity}%</p>
                  </div>
                  <div className="attribute">
                    <WiWindy className='fa' />
                    <p>Wind Speed: {currentWeatherData.windspeed} km/h</p>
                  </div>
                  <div className="attribute">
                    <TbTemperature className='fa' />
                    <p>Temp Diff: {(currentWeatherData.tempMax - currentWeatherData.tempMin).toFixed(2)}°C</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Weather;

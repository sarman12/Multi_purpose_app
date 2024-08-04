import React, { useState } from 'react';
import './Weather.css';
import Rain from '../../assets/rain.jpg';
import Rain1 from '../../assets/rain1.jpg';

import Sunny from '../../assets/sunny.jpg';
import Thunderstorm from '../../assets/thunderstorm.jpg';
import Cloudy from '../../assets/cloudy.jpg';
import Haze from '../../assets/haze.jpg';
import Cold from '../../assets/cold.jpg';

import { BiCloud, BiSearch, BiSun } from 'react-icons/bi';
import { WiHumidity, WiRain, WiThunderstorm, WiWindy } from 'react-icons/wi';
import { TbMist, TbTemperature } from 'react-icons/tb';
import Map from '../../assets/OIP.jpeg';
import { LuHaze } from 'react-icons/lu';
import { CiLocationOn } from 'react-icons/ci';
import { BsSnow } from 'react-icons/bs';
import { GiFog } from 'react-icons/gi';

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [error, setError] = useState(null);
  const apikey = "65f7b612e3b7902c807bca207f229519";

  const fetchWeather = async () => {
    if (!city) {
      setError("Error: No city name provided");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`);
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        console.log('Weather Data:', data);
      } else {
        setError("Error: City not found");
        setWeather(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError("Error: Unable to fetch weather data");
      setWeather(null);
    }
    setLoading(false);
  };

  const getCurrentWeatherData = () => {
    if (!weather) return {};
    const { list } = weather;
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
    const currentDate = new Date().getDate();
    const forecastData = weather.list.filter(forecast => {
      const forecastDate = new Date(forecast.dt * 1000).getDate();
      return forecastDate !== currentDate;
    });

    const dailyForecast = [];
    for (let i = 0; i < forecastData.length; i += 8) {
      const forecast = forecastData[i];
      const date = new Date(forecast.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temperature = forecast.main.temp.toFixed(2);
      const weatherType = forecast.weather[0].main;
      const Icon = getWeatherIcon(weatherType);
      dailyForecast.push({ dayName, temperature, Icon });
    }
    return dailyForecast.slice(0, 5); // Get only the next 5 days
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear': return BiSun;
      case 'Clouds': return BiCloud;
      case 'Rain': return WiRain;
      case 'Haze': return LuHaze;
      case 'Thunderstorm': return WiThunderstorm;
      case 'Snow': return BsSnow;
      case 'Mist': return TbMist;
      case 'Fog': return GiFog;
      default: return BiCloud;
    }
  };

  const getBackgroundImage = (weatherType) => {
    switch (weatherType) {
      case 'Clear': return Sunny;
      case 'Clouds': return Cloudy;
      case 'Rain': return Rain1;
      case 'Thunderstorm': return Thunderstorm;
      case 'Snow': return Cold;
      case 'Haze': return Haze;
      default: return Cloudy;
    }
  };

  const currentWeatherData = getCurrentWeatherData();
  const fiveDayForecast = getFiveDayForecast();
  const WeatherIcon = getWeatherIcon(currentWeatherData.weather);
  const image = getBackgroundImage(currentWeatherData.weather);

  return (
    <div className='weather_container' style={{ backgroundImage: `url(${image})` }}>
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
              <BiSearch onClick={fetchWeather} />
            </div>
            <div className="location_geotagging">
              <CiLocationOn className='fa_location' />
              {weather && <p>{weather.city.name}, {weather.city.country}</p>}
            </div>
          </div>

          {loading && <p className='loading'>Loading...</p>}

          {error && <div className='error'>{error}</div>}

          {weather && !loading && !error && (
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

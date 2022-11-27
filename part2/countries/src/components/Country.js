import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = (props) => {
    const [weatherData, setWeatherData] = useState([]);
  const capitalLatLong = props.country.capitalInfo.latlng;

  const requestString =
    'https://api.open-meteo.com/v1/forecast?latitude=' +
    capitalLatLong[0] +
    '&longitude=' +
    capitalLatLong[1] +
    '&hourly=temperature_2m&current_weather=true';

  useEffect(() => {
      axios.get(requestString).then((response) => {
      setWeatherData(response.data.current_weather);
    });
  }, [requestString]);

  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>capital: {props.country.capital}</p>
      <p>area: {props.country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(props.country.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={props.country.flags.png} alt={props.country.name.common} />
      <h2>Weather in {props.country.capital}</h2>
      <p>temperature: {weatherData.temperature} ºC</p>
      <p>wind: {weatherData.windspeed} km/h</p>
    </div>
  );
};

export default Country;

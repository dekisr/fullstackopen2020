import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    const endpoint = 'http://api.weatherstack.com/current'
    const api_key = process.env.REACT_APP_API_KEY
    const url = `${endpoint}?access_key=${api_key}&query=${country.capital}`

    const source = axios.CancelToken.source()
    axios
      .get(url, { cancelToken: source.token })
      .then((response) => setWeather(response.data))
      .catch((error) => {
        axios.isCancel(error)
          ? console.log('Request canceled')
          : console.warn(error)
      })
    return () => {
      setWeather(null)
      source.cancel()
    }
  }, [country])

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <div>
        <img
          src={country.flag}
          alt={`${country.name}'s flag`}
          style={{ width: '7rem', marginTop: '0.3rem' }}
        />
      </div>
      <h2>Weather in {country.capital}</h2>
      {weather && !weather.error ? (
        <div>
          <p>
            <strong>temperature:</strong> {weather.current.temperature} Celcius
          </p>
          <img
            src={weather.current.weather_icons[0]}
            alt={`Weather Icon for ${country.capital}`}
          />
          <p>
            <strong>wind:</strong> {weather.current.wind_speed} mph direction{' '}
            {weather.current.wind_dir}
          </p>
        </div>
      ) : weather && weather.error ? (
        <p>Couldn't get data from the API...</p>
      ) : (
        <p>Requesting data...</p>
      )}
    </>
  )
}

export default Country

import React from 'react'

const Country = ({ country }) => {
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
    </>
  )
}

export default Country

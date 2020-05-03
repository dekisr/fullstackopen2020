import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCts, setFilteredCts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data))
    // fetch('https://restcountries.eu/rest/v2/all')
    //   .then((response) => response.json())
    //   .then((data) => setCountries(data))
    return () => setCountries([])
  }, [])

  useEffect(() => {
    const filter = countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    )
    search ? setFilteredCts(filter) : setFilteredCts([])
    return () => setFilteredCts([])
  }, [countries, search])

  const handleCountry = (country) => {
    setFilteredCts([country])
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <main>
      find countries{' '}
      <input type="text" value={search} onChange={handleSearch} />
      <ul>
        {filteredCts.length < 10 &&
          filteredCts.length > 1 &&
          filteredCts.map((country) => (
            <li key={country.name}>
              {country.name}{' '}
              <button onClick={() => handleCountry(country) }>Show</button>
            </li>
          ))}
        {filteredCts.length > 10 && (
          <li>Too many matches, specify another filter</li>
        )}
      </ul>
      {filteredCts.length === 1 && <Country country={filteredCts[0]} />}
    </main>
  )
}

export default App

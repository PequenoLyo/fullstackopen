import { useState, useEffect } from 'react';
import axios from 'axios';

import SearchResults from './components/SearchResults.js';

const App = () => {
  const [countrySearchString, setCountrySearchString] = useState('');
  const [countries, setCountries] = useState([]);

  const handleCountrySearchStringChange = (e) => {
    setCountrySearchString(e.target.value);
  };

  useEffect(() => {
    console.log('useEffect triggered')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(countrySearchString.toLowerCase())))
  
      })
  }, [countrySearchString])
  console.log('Render', countries.length, 'countries')

  return (
    <div>
      find coutries:
      <input
        value={countrySearchString}
        onChange={handleCountrySearchStringChange}
      ></input>
      <SearchResults countries={countries} />
    </div>
  );
};

export default App;

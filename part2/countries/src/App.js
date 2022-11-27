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
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(
        response.data.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(countrySearchString.toLowerCase())
        )
      );
    });
  }, [countrySearchString]);

  const handleCountrySelectionButtonClick = (e) => {
    setCountrySearchString(e.target.value);
  };

  return (
    <div>
      find coutries:
      <input
        value={countrySearchString}
        onChange={handleCountrySearchStringChange}
      ></input>
      <SearchResults
        countries={countries}
        onCountrySelectionButtonClick={handleCountrySelectionButtonClick}
      />
    </div>
  );
};

export default App;

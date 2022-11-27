import Country from './Country.js';
import CountryShort from './CountryShort.js';

const SearchResults = (props) => {
  var SearchResultsContent;

  if (props.countries.length === 0) {
    SearchResultsContent = <p>No country found</p>;
  } else if (props.countries.length === 1) {
    SearchResultsContent = props.countries.map((country) => {
      return <Country key={country.name.common} country={country} />;
    });
  } else if (props.countries.length <= 10) {
    SearchResultsContent = props.countries.map((country) => {
      return (
        <CountryShort
          key={country.name.common}
          country={country}
          onCountrySelectionButtonClick={props.onCountrySelectionButtonClick}
        />
      );
    });
  } else {
    SearchResultsContent = <p>Too many matches, specify another filter</p>;
  }

  return <div>{SearchResultsContent}</div>;
};

export default SearchResults;

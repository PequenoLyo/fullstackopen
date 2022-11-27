const Country = (props) => {
 

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
      <img src={props.country.flags.png} alt={props.country.name.common}/>
    </div>
  );
};

export default Country;

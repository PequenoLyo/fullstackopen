const CountryShort = (props) => {
    return (
        <div>
            {props.country.name.common} <button value={props.country.name.common} onClick={props.onCountrySelectionButtonClick}>show</button>           
        </div>
    )
}

export default CountryShort
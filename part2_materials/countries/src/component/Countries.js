const CountryDetail = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <br></br>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(lang =>
                    <li>{lang}</li>
                )}
            </ul>
            <img src={country.flags.png} alt=""></img>
            
        </div>
    )

}

const Countries = ({countries, setCountries}) => {
    const numOfResults = countries.length
    
    if (numOfResults > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (numOfResults === 1){
        return (
            <CountryDetail country={countries[0]}/>
        )
    }
    else{
        return (
            <div>
                {countries.map(country => 
                        <div>
                            {country.name.common}
                            <button onClick={() => setCountries([country])}>
                                show
                            </button> 
                        </div>
                )}
            </div>
        )
    }
}
export default Countries
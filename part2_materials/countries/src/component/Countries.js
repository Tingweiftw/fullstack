import React, { useEffect, useState } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const CountryDetail = ({country}) => { 
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
          .then(response =>{
                setWeather(response.data.current)
          })
          .catch(error=> {
            console.log(error)
          })

      }, [country.capital])
    console.log(weather)
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <br></br>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(lang=>
                    <li key={lang}>{lang}</li>
                )}
            </ul>
            <img src={country.flags.png} alt=""></img>
            <h2>Weather in {country.capital}</h2>
            <p>temperature: {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt=""></img>
            <p>wind speed: {weather.wind_speed} m/s</p>
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
                        <div key={country.name.common}>
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
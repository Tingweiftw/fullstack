
import React from 'react'
// const api_key = process.env.REACT_APP_API_KEY

const CountryDetail = ({country}) => { 
    // const [weather, setWeather] = useState([])
    // const hook = () => {
    //     console.log('effect')
    //     axios
    //       .get('https://restcountries.com/v3.1/all')
    //       .then(response =>{
    //         console.log('promise fulfilled')
    //       })
    //   }
    // useEffect(hook, [])

    // useEffect(() => {
    //     const params = {
    //         access_key: api_key,
    //         query: country.capital
    //     }
    //     axios
    //         .get('http://api.weatherstack.com/current', {params})
    //         .then(response => {
    //             const apiResponse = response.data
    //             console.log(apiResponse)
    //         })
    //         .catch(error =>{
    //             console.log(error)
    //         })

    // })

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
            <p>temperature:{} Celsius</p>
            
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
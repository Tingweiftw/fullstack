import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './component/Filter'
import Countries from './component/Countries'

const App = () => {
  // initial load of all countries
  const [countries, setCountries] = useState([])
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>{
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const [filterName, setFilterName] = useState("")
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
    console.log(filterName)
  }

  const countriesToShow = (filterName === "")
  ? countries
  : countries.filter(c => c.name.common.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <Filter 
        nameToFilter = {filterName}
        onFilterChange = {handleFilterNameChange}
      />
      <Countries countries = {countriesToShow}/>
    </div>
  );
}

export default App;

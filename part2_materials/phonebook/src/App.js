import { useEffect, useState } from 'react'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'
import Filter from './component/Filter'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promised fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).some((p) => p === newName)) {
      alert(`${newName} exist in phonebook`)
    }
    else if (newName === "") {
      alert("Please enter a name")
    }
    else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
    console.log(personsToShow)
  }
  const personsToShow = (filterName === "")
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add new contacts</h2>
      <PersonForm 
        onSubmit={addName}
        nameValue={newName}
        onChangeName={handleNameChange}
        numberValue={newNumber}
        onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Filter 
        nameToFilter = {filterName}
        onFilterChange = {handleFilterNameChange}
      />
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
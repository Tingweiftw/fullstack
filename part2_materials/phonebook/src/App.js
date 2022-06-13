import React, { useEffect, useState } from 'react'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'
import Filter from './component/Filter'
import personService from './services/personService'

const App = () => {

  const [persons, setPersons] = useState([])
  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialContacts => {
        console.log('promised fulfilled')
        setPersons(initialContacts)
      })
  }
  useEffect(hook, [])
  
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).some((p) => p === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replaced the old number with new one?`)){
        const personObject = persons.find(n => n.name === newName)
        personObject['number'] = newNumber
        personService
          .update(personObject.id, personObject)
          .then(returnedContact => {
            console.log('updated')
          })
      }

    }
    else if (newName === "") {
      alert("Please enter a name")
    }
    else if (newNumber === "") {
      alert("Please enter a number")
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
        .create(personObject)
        .then(returnedContact => {
          console.log('saved')
          setPersons(persons.concat(returnedContact))
        }) 
    }
    setNewName("")
    setNewNumber("")
  }
  const deleteName = (id) => {
    if (window.confirm(`Delete ${persons.find(n => n.id === id).name} ?`)) {
      personService
      .deleteContact(id)
      .then(returnedContact => {
        console.log(`deleted ${id}`)
        setPersons(persons.filter(p => p.id != id))
      })
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
      <Persons persons={personsToShow} deleteName={deleteName}/>
    </div>
  )
}

export default App
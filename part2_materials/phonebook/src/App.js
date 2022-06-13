import React, { useEffect, useState } from 'react'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'
import Filter from './component/Filter'
import Notification from './component/Notification'
import personService from './services/personService'
import './index.css'

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
  const [notifMessage , setNotifMessage] = useState({
    "message":null,
    "type":null
  })

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
        setNotifMessage({
          "message": `Updated ${newName}`,
          "type" : "success"
        })
        setTimeout(() => {
          setNotifMessage({
            "message":null,
            "type":null
          })
        }, 5000)
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
      }
      personService
        .create(personObject)
        .then(returnedContact => {
          console.log('saved')
          setPersons(persons.concat(returnedContact))
        }) 
      setNotifMessage({
        "message": `Added ${newName}`,
        "type" : "success"
      })
      setTimeout(() => {
        setNotifMessage({
          "message":null,
          "type":null
        })
      }, 5000)
    }
    
    setNewName("")
    setNewNumber("")
    
  }
  const deleteName = (id) => {
    const person_name = persons.find(n => n.id === id).name
    if (window.confirm(`Delete ${person_name} ?`)) {
      personService
      .deleteContact(id)
      .then(returnedContact => {
        console.log(`deleted ${id}`)
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        setNotifMessage({
          "message": `Information of ${person_name} has already been removed from the server`,
          "type" : "error"
        })
        setTimeout(() => {
          setNotifMessage({
            "message":null,
            "type":null
          })
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
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
      <Notification message={notifMessage.message} type={notifMessage.type}/>
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
import { useState } from 'react'

const Contact = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1,
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).some((p) => p === newName)) {
      alert("Person exist in phonebook")
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
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value = {newName}
            onChange = {handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value = {newNumber}
            onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Contact key= {person.id} person={person}/>
      )}
    </div>
  )
}

export default App
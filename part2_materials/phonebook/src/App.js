import { useState } from 'react'

const Contact = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
  }

  const personsToShow = (filterName === "")
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filterName))

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add new contacts</h2>
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
      <form>
        <div>
          filter shown with <input
            value = {filterName}
            onChange = {handleFilterNameChange}
          />
        </div>
      </form>
      {personsToShow.map(person =>
        <Contact key= {person.id} person={person}/>
      )}
    </div>
  )
}

export default App
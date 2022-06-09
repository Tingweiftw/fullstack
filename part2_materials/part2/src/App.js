import Note from './component/Note'
import React, { useState, useEffect } from 'react'
import axios from 'axios'



const App = (props) => {
  //actual list of notes
  const [notes, setNotes] = useState([]) 
  //placeholder text for input box and for state changes
  const [newNote, setNewNote] = useState('a new note...')
  //to show all based on status
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
    })
  }
  useEffect(hook, []) // empty array means only run once first render

  const addNote = (event) => {
    event.preventDefault()
    
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(), 
      important: Math.random() < 0.5,
    }
    setNotes(notes.concat(noteObject))
    setNewNote("") // set the input field blank again
    console.log('button clicked', notes)
  }

  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }
  // conditional notes to show based on syntax below
  // const result = condition ? value1 : value2
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'} 
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App
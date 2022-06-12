import Note from './component/Note'
import noteService from './services/noteService'

import React, { useState, useEffect } from 'react'

const App = (props) => {
  //actual list of notes
  const [notes, setNotes] = useState([]) 
  //placeholder text for input box and for state changes
  const [newNote, setNewNote] = useState('a new note...')
  //to show all based on status
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
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
    
    console.log('button clicked', notes)
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote("") // set the input field blank again
      })
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

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    noteService
      .update(id, changedNote)
      .then(returnedNote  => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note ${note.content} was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

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
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
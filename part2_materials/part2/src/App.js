import Note from './component/Note'
import Notification from './component/Notification'
import noteService from './services/noteService'

import React, { useState, useEffect } from 'react'
import './index.css'

const App = (props) => {
  //actual list of notes
  const [notes, setNotes] = useState([]) 
  //placeholder text for input box and for state changes
  const [newNote, setNewNote] = useState('a new note...')
  //to show all based on status
  const [showAll, setShowAll] = useState(true)
  // error state 
  const [errorMessage , setErrorMessage] = useState('some error happened...')

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
        setErrorMessage(
          `Note ${note.content} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
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
      <Footer/>
    </div>
  )
}

export default App
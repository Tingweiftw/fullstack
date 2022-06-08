import { useState } from 'react'

const Hello = (props) => {
    return (
      <div>
        <p>
          Hello {props.name}, you are {props.age} years old
        </p>
      </div>
    )
  }

const Display = ({label, counter }) => {
    return (
        <div>{label}: {counter}</div>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)


const App = () => {
    const name = 'Peter'
    const age = 10

    // Single State Events Handling
    const [ counter, setCounter ] = useState(0)
    const addCounter = () => setCounter(counter+1)
    const minusCounter = () => setCounter(counter-1)
    const resetCounter = () => setCounter(0)

    // Multiple State & Array State with Event Handling
    const [clicks, setClicks] = useState({left: 0, right: 0})
    const [sequence, setSequence] = useState([])
    
    const handleLeftClick = () => {
        const newClicks = { 
            left: clicks.left + 1, 
            right: clicks.right 
        }
        setClicks(newClicks)
        setSequence(sequence.concat("L"))
    }
    
    const handleRightClick = () => {
        const newClicks = { 
            left: clicks.left, 
            right: clicks.right + 1 
        }
        setClicks(newClicks)
        setSequence(sequence.concat("R"))
    }

    const resetClicks = () => {
        const newClicks = { 
            left: 0,
            right: 0
        }
        setClicks(newClicks)
        setSequence([])
    }
    return (
        <div>
        <h1>Greetings</h1>
        <Hello name="Maya" age={26 + 10} />
        <Hello name={name} age={age} />
        <Display label = {"Counter"} counter = {counter}/>
        <Button onClick = {addCounter} text = {"Add"}/>
        <Button onClick = {minusCounter} text = {"Minus"}/>
        <Button onClick = {resetCounter} text = {"Reset"}/>
        <Display label = {"Left"} counter = {clicks.left}/>
        <Display label = {"Right"} counter = {clicks.right}/>
        <Display label = {"Sequence"} counter = {sequence.join("")}/>
        <Button onClick = {handleLeftClick} text = {"Left"}/>
        <Button onClick = {handleRightClick} text = {"Right"}/>
        <Button onClick = {resetClicks} text = {"Reset"}/>
        </div>
    )
}

 export default App
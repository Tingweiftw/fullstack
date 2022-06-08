import { useState } from 'react'

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
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const voteGood = () => setGood(good+1)
  const voteNeutral = () => setNeutral(neutral+1)
  const voteBad = () => setBad(bad+1)
  const sumAll = () => good+bad+neutral
  const averageAll = () => (good*1+bad*-1+neutral*0) / sumAll()
  const positivePct = () => good / sumAll() * 100

  return (
    <div>
        <h1>Give Feedback</h1>
        <Button onClick={voteGood} text={"Good"}/>
        <Button onClick={voteNeutral} text={"Neutral"}/>
        <Button onClick={voteBad} text={"Bad"}/>
        <h1>Statistic</h1>
        <Display label = {"Good"} counter = {good}/>
        <Display label = {"Neutral"} counter = {neutral}/>
        <Display label = {"Bad"} counter = {bad}/>
        <Display label = {"All"} counter = {sumAll()}/>
        <Display label = {"Average"} counter = {averageAll()}/>
        <Display label = {"Positive"} counter = {positivePct() + "%"}/>

    </div>
  )
}

export default App
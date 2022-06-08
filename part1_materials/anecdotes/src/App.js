import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Result = ({anc, votes, hasVotes}) => {
  if (hasVotes === true){
      return (
          <div>
            {anc} 
            <br></br>
             has {votes} votes.
          </div>
      )
  }
  else {
    return <div>There are no votes at the moment!</div>
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  // Click Event States
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [hasVotes, setHasVotes] = useState(false)
  const [maxVotesIndex, setMaxVotesIndex] = useState(0)
  const [maxVotes, setMaxVotes] = useState(0)
  // Click Event Functions 
  const nextAnecdotes = () => {
    return setSelected(getRandomInt(anecdotes.length))
  }

  const voteAnecdotes = () => {
    const scoreCopy = votes
    scoreCopy[selected] += 1
    setVotes(scoreCopy)
    setHasVotes(true)
    const newMax = votes.indexOf(Math.max(...votes))
    setMaxVotesIndex(newMax)
    setMaxVotes(Math.max(...votes))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Button onClick={voteAnecdotes} text={"Vote anecdote"}/>
      <Button onClick={nextAnecdotes} text={"Next anecdote"}/>
      <h1>Anecdote with most votes</h1>
      <Result anc = {anecdotes[maxVotesIndex]} votes = {maxVotes} hasVotes={hasVotes}/>
    </div>
  )
}

export default App
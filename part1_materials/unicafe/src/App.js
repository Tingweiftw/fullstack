import { useState } from 'react'

const StatisticLine  = ({text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const Statistics = (props) => {
    if (props.all == 0){
        return (
            <div>
                no feedback
            </div>
        )
    }
    else {
        return (
            <div>
                <table><tbody>
                <StatisticLine text = {"Good"} value = {props.good}/>
                <StatisticLine text = {"Neutral"} value = {props.neutral}/>
                <StatisticLine text = {"Bad"} value = {props.bad}/>
                <StatisticLine text = {"All"} value = {props.all}/>
                <StatisticLine text = {"Average"} value = {props.average}/>
                <StatisticLine text = {"Positive"} value = {props.positive}/>
                </tbody></table>
            </div>
        )
    }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const voteGood = () => setGood(good+1)
  const voteNeutral = () => setNeutral(neutral+1)
  const voteBad = () => setBad(bad+1)
  const sumAll = () => good+bad+neutral
  const averageAll = () =>  ((good*1+bad*-1+neutral*0) / sumAll()).toFixed(2)
  const positivePct = () => (good / sumAll() * 100).toFixed(2)

  return (
    <div>
        <h1>Give Feedback</h1>
        <Button onClick={voteGood} text={"Good"}/>
        <Button onClick={voteNeutral} text={"Neutral"}/>
        <Button onClick={voteBad} text={"Bad"}/>
        <h1>Statistic</h1>
        <Statistics good = {good}
                    neutral = {neutral}
                    bad = {bad}
                    all = {sumAll()}
                    average = {averageAll()}
                    positive = {positivePct() + "%"}
        />
        

    </div>
  )
}

export default App
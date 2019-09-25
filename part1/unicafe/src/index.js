import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Buttons = ({ handleGoodClick, handleNeutralClick, handleBadClick}) => {
  return (
    <div>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
    </div>
  )
}

const Statistic = ( { text, value } ) => (
  <tr>
  <td>{text}</td><td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad
  if (all!==0) {
    let average = (good-bad) / all
    let positive = (100 * good / all)+ ' %'
    return (
      <div>
        <table>
          <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />        
            <Statistic text='all' value={all} />
            <Statistic text='average' value={average} />
            <Statistic text='positive' value={positive} />
          </tbody>
        </table>
      </div>
    )
  }
  
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons handleGoodClick={handleGoodClick} handleNeutralClick={handleNeutralClick} handleBadClick={handleBadClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
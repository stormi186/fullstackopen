import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const initialVotes = [0, 0, 0, 0, 0, 0]
  const [points, setVotes] = useState(initialVotes)

  const handleClick = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVotes = () => {
    const copy = [...points]
    copy[selected] += 1 
    setVotes(copy)
  }

  const maxArrayIndex = () => points.indexOf(Math.max.apply( Math, points ))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[maxArrayIndex()]}</p>
      <p>has {points[maxArrayIndex()]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
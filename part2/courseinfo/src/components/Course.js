import React from 'react'

const Header = ( {name}) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}

const Part = ( {name, exercises} ) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = ( {parts} ) => {
  const rows = () => parts.map(part =>
    <Part
      key={part.id}
      name={part.name}
      exercises={part.exercises}
    />
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

const Total = ( {parts} ) => {

  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

const Course = ( {name, parts} ) => {
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )

}

export default Course
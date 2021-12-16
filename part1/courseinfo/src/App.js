import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Footer total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      <PartItem name={parts[0].name} num={parts[0].exercises} />
      <PartItem name={parts[1].name} num={parts[1].exercises} />
      <PartItem name={parts[2].name} num={parts[2].exercises} />
    </>
  )
}

const PartItem = (props) => {
  return (
    <p>
      {props.name} {props.num}
    </p>
  )
}

const Footer = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

export default App
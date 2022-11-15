import React from 'react'
import ReactDOM from 'react-dom'



const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p>{props.part} {props.ex}</p>
    </>
  )
}

const Content = (props) => {
  return(
    <>
      <Part part={props.part1} ex={props.exercises1} />
      <Part part={props.part2} ex={props.exercises2} />
      <Part part={props.part3} ex={props.exercises3} />
    </>
  )
}

const Total = (props) => {
  return(
    <>
      <p>Number of exercises {props.ex1 + props.ex2+ props.ex3}</p>
    </>
  )
}

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
      <Header course={course} />
      <Content part1={parts[0].name} part2={parts[1].name} part3={parts[2].name} exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises} />
      <Total ex1={parts[0].exercises} ex2={parts[1].exercises} ex3={parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

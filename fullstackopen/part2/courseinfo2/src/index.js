import React, { useState } from 'react'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const Header1 = ({ text }) => <h1>{text}</h1>
const Header2 = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const totalAmount = parts.reduce( (suma, parte) =>  suma + parte.exercises , 0 )
  console.log(totalAmount)
  return (
    <>
      {parts.map( x => <Part key={x.id} part={x} />)}
      <Total sum={totalAmount} />
    </> 
  )
}

const Course = ({ course }) => 
  <>
    <Header2 course={course.name} />
    <Content parts={course.parts} /> 
  </>
        

    
const AllCourses = ({ all }) =>
    <>
      <Header1 text='Web development curriculum' />
      {all.map( x => <Course key={x.id} course={x} /> )}
    </>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]


  return <AllCourses all={courses} />
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

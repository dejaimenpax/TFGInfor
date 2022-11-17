import React, { useState } from 'react'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//Changed imports in order to avoid warnings with React 18

const Statistic = ({text, statistic, symbol}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{statistic} {symbol}</td>
    </tr>
  )
}

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {

  const all = good+neutral+bad
  if (all==0)
    return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        <Statistic text='good' statistic={good} />
        <Statistic text='neutral' statistic={neutral} />
        <Statistic text='bad' statistic={bad} />
        <Statistic text='all' statistic={all} />
        <Statistic text='average' statistic={(good-bad)/all} />
        <Statistic text='positive' statistic={good/all*100} symbol='%' />
      </tbody>
    </table>
  )
}

const Subtitle = ({ text }) => {
  return <h2>{text}</h2>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Subtitle text='give feedback' />
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <Subtitle text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

//Done this in order to avoid warnings with React 18
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

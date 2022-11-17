import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Line = ({text, attribute}) => {
  return <p>{text} {attribute}</p>
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Contadores = ({ good, neutral, bad }) => {
  return (
    <>
      <Line text='good' attribute={good} />
      <Line text='neutral' attribute={neutral} />
      <Line text='bad' attribute={bad} />
    </>
  )
}
const Statistics = ({ good, neutral, bad }) => {

  const all = good+neutral+bad
  if (all!=0) { //pasa por aqui si ya se ha pulsado algun boton
    return (
      <>
        <Subtitle text='statistics' />
        <Contadores
          good={good}
          neutral={neutral}
          bad={bad}
        />
        <Line text='all' attribute={all} />
        <Line text='average' attribute={(good-bad)/all} />
        <Line text='positive' attribute={good/all*100} />
      </>
    )
  }
  return (
    <>
      <Subtitle text='statistics' />
      <Line text='No feedback given' />
    </>
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
      <button onClick={increaseGood}>
        good
      </button>
      <button onClick={increaseNeutral}>
        neutral
      </button>
      <button onClick={increaseBad}>
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}




ReactDOM.render(<App />,
  document.getElementById('root')
)

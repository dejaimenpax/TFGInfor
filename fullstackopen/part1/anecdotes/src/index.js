import React, { useState } from 'react'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//Changed imports in order to avoid warnings with React 18

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdote }) => {
  return <p>{anecdote}</p>
}

const Subtitle = ({ text }) => {
  return <h2>{text}</h2>
}

const VotesInformation = ({ number }) => {
  return <p>has {number} votes</p>
}


const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const [votes, setVotes] = useState(new Array(6).fill(0))
  const [maxVotedIndex, setMaxVotedIndex] = useState(selected)

  const randomAnecdote = () => setSelected(Math.floor(Math.random() * 6))
  const updateVotes = () => {
    const newVotes = [].concat(votes)
    newVotes[selected] = votes[selected]+1 //could be newVotes[selected] = newVotes[selected]+1
    setVotes(newVotes)
    if (newVotes[selected]==Math.max(...votes)){
      setMaxVotedIndex(selected)
    }
  }

  return (
    <div>
      <Subtitle text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} />
      <VotesInformation number={votes[selected]} />
      <Button handleClick={updateVotes} text='vote' />
      <Button handleClick={randomAnecdote} text='next anecdote' />
      <Subtitle text='Anecdote with most votes' />
      <Anecdote anecdote={anecdotes[maxVotedIndex]} />
      <VotesInformation number={votes[maxVotedIndex]} />
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

//Done this in order to avoid warnings with React 18
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App anecdotes={anecdotes}/>
  </StrictMode>
)

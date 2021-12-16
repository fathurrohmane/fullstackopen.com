import React, { useState } from 'react'

const App3 = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(random(anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>{`has ${votes[selected]} votes`}</div>
      <button onClick={() => setVotes(addVotes(votes, selected))}>vote</button>
      <button onClick={() => setSelected(random(anecdotes.length))}>next anecdote</button>
      <MaxAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  )
}

const MaxAnecdote = ({anecdotes, votes}) => {

  const maxValue = Math.max(...votes)
  const max = votes.indexOf(maxValue)

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>
        {anecdotes[max]}
      </div>
      <div>{`has ${votes[max]} votes`}</div>
    </>
  )

}

const random = (max) => {
  return (Math.floor(Math.random() * max))
}

const addVotes = (array, selectedId) => {
  const newArray = [...array]
  newArray[selectedId] = newArray[selectedId] + 1
  return newArray
}


export default App3
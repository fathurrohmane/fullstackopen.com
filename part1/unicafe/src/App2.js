import React, { useState } from 'react'

const App2 = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  const update = (value, fun) => () => {
    fun(value + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={update(good, setGood)}>good</button>
      <button onClick={update(neutral, setNeutral)}>neutral</button>
      <button onClick={update(bad, setBad)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Stat = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  return (
    total === 0 ? <p>No feedback given</p> :
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Stat text={'good'} value={good} />
            <Stat text={'neutral'} value={neutral} />
            <Stat text={'bad'} value={bad} />
            <Stat text={'all'} value={total} />
            <Stat text={'average'} value={(good + neutral * 0 + bad * -1) / total} />
            <Stat text={'positive'} value={`${good / total} %`} />
          </tbody>
        </table>
      </>
  )
}

export default App2
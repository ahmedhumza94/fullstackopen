import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
      {text} {value}<br></br>
    </>
  )
}

const Statisics = (props) => {

  if (props.total === 0) {
    return (
      <div>No feedback given</div>
    )
  } else if (props.good === 0 || props.neutral === 0 || props.bad === 0) {
    return (
      <div>Collect more feedback to view statistics</div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='total' value={props.total} />
        <StatisticLine text='average' value={props.average} />
        <StatisticLine text='positive' value={props.positive} />
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const incrementGood = () => {
    const newValue = good + 1
    setGood(newValue)
    const newTotal = newValue + neutral + bad
    setTotal(newTotal)
    setAverage((newValue + (-1 * bad)) / newTotal)
    setPositive(newValue/newTotal)
  }

  const incrementNeutral = () => {
    const newValue = neutral + 1
    setNeutral(newValue)
    const newTotal = good + newValue + bad
    setTotal(newTotal)
    setAverage((good + (-1 * bad)) / newTotal)
    setPositive(good/newTotal)
  }

  const incrementBad = () => {
    const newValue = bad + 1
    setBad(newValue)
    const newTotal = good + neutral + newValue
    setTotal(newTotal)
    setAverage((good + (-1 * newValue)) / newTotal)
    setPositive(good/newTotal)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incrementGood} text='good' />
      <Button onClick={incrementNeutral} text='neutral' />
      <Button onClick={incrementBad} text='bad' />
      <Statisics good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        average={average} 
        positive={positive}
       />
    </div>
  )
}

export default App
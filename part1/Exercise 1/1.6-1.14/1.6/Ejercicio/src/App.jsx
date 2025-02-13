import { useState } from 'react'

const Header = ({ titulo }) => <h1>{titulo}</h1>

const Button = ({ handleClick, text }) => <button onClick={() => handleClick(text)}>{text}</button>

const StatisticLine = ({ text, value }) =>(
  <tr>
    <td>{text} {value}</td>
  </tr>

)
const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average.toFixed(3)} />
      <StatisticLine text="positive" value={positive.toFixed(3) + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const t1 = 'give feedback'
  const t2 = 'statistics'
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (text) => {
    switch (text) {
      case 'good':
        setGood(good + 1)
        break
      case 'neutral':
        setNeutral(neutral + 1)
        break
      case 'bad':
        setBad(bad + 1)
        break
      default:
        break
    }
  }

  const total = good + neutral + bad 
  const average = total > 0 ? (good - bad) / total : 0
  const positive = total > 0 ? (good / total) * 100 : 0

  return (
    <>
      <Header titulo={t1} />
      <Button handleClick={handleClick} text="good" />
      <Button handleClick={handleClick} text="neutral" />
      <Button handleClick={handleClick} text="bad" />
      <Header titulo={t2} />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        average={average} 
        positive={positive} 
      />
    </>
  )
}

export default App
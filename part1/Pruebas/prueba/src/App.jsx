import { useState } from 'react'

// Este es lugar correcto para definir un componente
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => <div>{props.value}</div>

const App = () => {
  const [value, setValue] = useState(10)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  const resetLeftAndRight = () => {
    setLeft(0)
    setRight(0)
  }
 

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
      <Button handleClick={resetLeftAndRight} text="reset left and right" />

    </div>
  )
}
export default App
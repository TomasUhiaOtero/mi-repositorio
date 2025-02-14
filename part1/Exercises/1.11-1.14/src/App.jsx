import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const LineaAnecdotas = ({anecdotes,selected}) => {
  return (
    <p>{anecdotes[selected]}</p>
  )
}

const AnecdotaMasVotada = ({anecdotes, votes}) => {
  const max = Math.max(...votes)
  const index = votes.indexOf(max)

  return(
    <p>{anecdotes[index]}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const escogerAnecdotaRandom = () => {
    const aleatorio = Math.floor(Math.random() * anecdotes.length)
    setSelected(aleatorio)
  }

  const votarAnecdota = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }



  return (
    <>
      <Header text={"Anécdota del Día"}></Header>
      <LineaAnecdotas anecdotes={anecdotes} selected={selected}></LineaAnecdotas>
      <Button onClick={escogerAnecdotaRandom} text={"Siguiente Anécdota"}></Button>
      <Button onClick={votarAnecdota} text={"Votar"}></Button>

      <Header text={"Anécdota más Votada"}></Header>
      <AnecdotaMasVotada anecdotes={anecdotes} votes={votes}></AnecdotaMasVotada>

    </>
  )
}

export default App
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Formulary from './components/Formulary'
import SearchBar from './components/SearchBar'
import personService from './services/personService'

const App = () => {
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(!newName || !newNumber) {
      alert('Please fill in all fields')
      return; 
    }
    
    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: newNumber}
        
        personService.update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('There was an error updating the person', error)
        })
      }
      return;
    }

  
    const newPerson = { name: newName, number: newNumber }

    personService.create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.log('There was an error adding the person', error)
    })
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log('There was an error deleting the person', error)
      })
    }
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase()) || person.number.includes(search)
  )



  return (
    <>
    <Header Title="Phonebook." />
    <SearchBar search={search} setSearch={setSearch}/>
      <Header Title="Add a new Contact." />
      <Formulary
        newName={newName}
        setNewName={setNewName}
        addPerson={addPerson}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <Header Title="Numbers." />
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.name}>
            {person.name} - {person.number}
            <button style={{marginLeft: '30px'}} onClick={() => removePerson(person.id, person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulary from './components/Formulary';
import SearchBar from './components/SearchBar';
import axios from 'axios';

const App = () => {
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if(!newName || !newNumber) {
      alert('Please fill in all fields');
      return; 
    }
    if (persons.some(person => person.name === newName || person.number === newNumber )) {
      alert(`${newName} or ${newNumber} is already added to the phonebook`);
      return;
    }

  
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

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
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
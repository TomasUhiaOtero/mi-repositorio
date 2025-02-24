import { useState } from 'react';
import Header from './components/Header';
import Formulary from './components/Formulary';
import SearchBar from './components/SearchBar';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

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
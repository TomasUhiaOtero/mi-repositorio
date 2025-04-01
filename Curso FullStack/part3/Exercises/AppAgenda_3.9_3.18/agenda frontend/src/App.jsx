import { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulary from './components/Formulary';
import SearchBar from './components/SearchBar';
import personService from './services/personService';
import NotificacionAgenda from './components/NotificacionAgenda';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [persons, setPersons] = useState([]);
  const [notificacionMensaje, setNotificacionMensaje] = useState(null);
  const [notificacionTipo, setNotificacionTipo] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error('Error fetching persons:', error);
        setNotificacionMensaje('Failed to fetch persons from the server');
        setNotificacionTipo('error');
        setTimeout(() => {
          setNotificacionMensaje(null);
        }, 5000);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName || !newNumber) {
      alert('Please fill in all fields');
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
            setNotificacionMensaje(`Updated ${newName}'s number`);
            setNotificacionTipo('success');
            setTimeout(() => {
              setNotificacionMensaje(null);
            }, 3000);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.error ||
              `Information of ${newName} has already been removed from server`;
            setNotificacionMensaje(errorMessage);
            setNotificacionTipo('error');
            setTimeout(() => {
              setNotificacionMensaje(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setNotificacionMensaje(`Added ${newPerson.name}`);
        setNotificacionTipo('success');
        setTimeout(() => {
          setNotificacionMensaje(null);
        }, 3000);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error || 'There was an error adding the person';
        setNotificacionMensaje(errorMessage);
        setNotificacionTipo('error');
        setTimeout(() => {
          setNotificacionMensaje(null);
        }, 5000);
      });
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotificacionMensaje(`Deleted ${name}`);
          setNotificacionTipo('success');
          setTimeout(() => {
            setNotificacionMensaje(null);
          }, 3000);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.error ||
            `Information of ${name} has already been removed from server`;
          setNotificacionMensaje(errorMessage);
          setNotificacionTipo('error');
          setTimeout(() => {
            setNotificacionMensaje(null);
          }, 5000);
        });
    }
  };

  const filteredPersons = Array.isArray(persons)
    ? persons.filter(
        (person) =>
          person.name.toLowerCase().includes(search.toLowerCase()) ||
          person.number.includes(search)
      )
    : [];

  return (
    <>
      <Header Title="Phonebook." />
      <NotificacionAgenda message={notificacionMensaje} type={notificacionTipo} />
      <SearchBar search={search} setSearch={setSearch} />
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
          <li key={person.id}>
            {person.name} - {person.number}
            <button
              style={{ marginLeft: '30px' }}
              onClick={() => removePerson(person.id, person.name)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
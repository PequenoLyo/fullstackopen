import { useState, useEffect } from 'react';

import PersonService from './services/persons.js';
import PersonList from './Persons.js';
import Filter from './Filter.js';
import PersonForm from './PersonForm.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsWasUpdated, setPersonsWasUpdated] = useState(true);

  useEffect(() => {
    if (personsWasUpdated) {
      console.log('.getAll()');
      PersonService.getAll().then((response) => {
        console.log('.getAll() promise fulfilled');
        setPersons(response.data);
        setPersonsWasUpdated(false);
      });
    } else {
      return;
    }
  }, [personsWasUpdated]);
  console.log('Render', persons.length, 'persons');

  const handleNewEntry = (e) => {
    e.preventDefault();
    if (isDuplicatePerson(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      PersonService.create(newPerson).then((response) => console.log(response));

      setPersonsWasUpdated(true);

      setNewName('');
      setNewNumber('');
    }
  };

  const handleDeleteEntry = (e) => {
    e.preventDefault();
    const i = e.target.value;
    if (
      !window.confirm(
        `Delete ${persons.find((person) => person.id == i).name}?`
      )
    ) {
      return;
    }
    console.log('Removing id', i);
    PersonService.del(i).then((response) => console.log(response));

    // setPersons(persons.filter(person => person.id !== i))
    //setPersons(persons.map(p => ({...p, id: persons.indexOf(p)})))
    setPersonsWasUpdated(true);
    setNewName('');
    setNewNumber('');
  };

  const handleFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const isDuplicatePerson = (n) => {
    return persons.some((person) => person.name === n);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} onFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onFormSubmit={handleNewEntry}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList
        persons={persons}
        filter={nameFilter}
        onPersonDelete={handleDeleteEntry}
      />
    </div>
  );
};

export default App;

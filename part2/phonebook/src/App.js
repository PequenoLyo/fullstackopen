import { useState } from 'react';

import Persons from './Persons.js';
import Filter from './Filter.js';
import PersonForm from './PersonForm.js';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNewEntry = (e) => {
    e.preventDefault();
    if (isDuplicatePerson(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.count + 1 },
      ]);
      setNewName('');
      setNewNumber('');
    }
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
      <PersonForm name={newName} number={newNumber} onFormSubmit={handleNewEntry} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={nameFilter} />
    </div>
  );
};

export default App;

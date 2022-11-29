import { useState, useEffect } from 'react';

import PersonService from './services/persons.js'
import PersonList from './Persons.js';
import Filter from './Filter.js';
import PersonForm from './PersonForm.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

useEffect(() => {
  console.log('useEffect triggered')
  PersonService
    .getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)

    })
}, [])
console.log('Render', persons.length, 'persons')

  const handleNewEntry = (e) => {
    e.preventDefault();
    if (isDuplicatePerson(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length +1
      }
      PersonService
      .create(newPerson)
      .then(response => console.log(response))

      setPersons(persons.concat(newPerson))
      
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
      <PersonList persons={persons} filter={nameFilter} />
    </div>
  );
};

export default App;

import { useState, useEffect } from 'react';

import PersonService from './services/persons.js';
import PersonList from './Persons.js';
import Filter from './Filter.js';
import PersonForm from './PersonForm.js';
import Notification from './Notification.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsWasUpdated, setPersonsWasUpdated] = useState(true);
  const [notificationContent, setNotificationContent] = useState([null, null]);

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

  useEffect(() => {
    console.log('Notification useEffect triggered');
    if (!(notificationContent[1] == null)) {
      console.log('Fire 2 second timer');

      const timer = setTimeout(() => {
        setNotificationContent([null, null]);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notificationContent]);

  const handleNewEntry = (e) => {
    e.preventDefault();
    if (isDuplicatePerson(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const i = persons.find((person) => person.name === newName).id;
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        PersonService.update(i, newPerson)
          .then(setPersonsWasUpdated(true))
          .then(setNewName(''))
          .then(setNewNumber(''))
          .then(
            setNotificationContent(['success', `Updated ${newPerson.name}`])
          )
          .catch((error) => {
            setNotificationContent([
              'error',
              `${newPerson.name} has already been removed from the server`,
            ]);
          });
      } else {
        return;
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      PersonService.create(newPerson).then((response) => {
        console.log(response);
        setPersonsWasUpdated(true);
        setNewName('');
        setNewNumber('');
        setNotificationContent(['success', `Added ${newPerson.name}`]);
      })
      .catch(error => console.log(error.response.data.error));
    }
  };

  const handleDeleteEntry = (e) => {
    e.preventDefault();
    const i = e.target.value;
    const person = persons.find((person) => person.id == i);
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }
    console.log('Removing id', i);
    PersonService.del(i)
      .then((response) => console.log(response))
      .then(setPersonsWasUpdated(true))
      .then(setNewName(''))
      .then(setNewNumber(''))
      .then(setNotificationContent(['success', `Deleted ${person.name}`]))
      .catch((error) => {
        setNotificationContent([
          'error',
          `${person.name} has already been removed from the server`,
        ]);
      });
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
      <Notification
        className={notificationContent[0]}
        message={notificationContent[1]}
      />
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

import { useState } from 'react';

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

  const isPersonShown = (name, nameFilter) => {
        return name.toLowerCase().includes(nameFilter.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{' '}
      <input value={nameFilter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <form onSubmit={handleNewEntry}>
        <div>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(
        (p) =>
          isPersonShown(p.name, nameFilter) && (
            <p key={p.id}>
              {' '}
              {p.name} {p.number}{' '}
            </p>
          )
      )}
    </div>
  );
};

export default App;

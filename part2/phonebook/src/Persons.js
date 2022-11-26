import Person from './Person.js';

const Persons = (props) => {
  const isPersonShown = (name, nameFilter) => {
    return name.toLowerCase().includes(nameFilter.toLowerCase());
  };
  console.log(props.persons)
  return props.persons.map(
    (p) =>
      isPersonShown(p.name, props.filter) && (
        <Person key={p.id} name={p.name} number={p.number} />
      )
  );
};

export default Persons;

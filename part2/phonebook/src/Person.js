const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
      <button value={props.id} onClick={props.onPersonDelete}>
        delete
      </button>
    </div>
  );
};

export default Person;

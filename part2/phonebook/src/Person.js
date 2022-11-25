const Person = (props) => {
  return (
    <p key={props.id}>
      {props.name} {props.number}
    </p>
  );
};

export default Person;

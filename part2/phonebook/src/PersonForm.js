const PersonForm = (props) => {
  return (
    <form onSubmit={props.onFormSubmit}>
      <div>
        <div>
          name: <input value={props.name} onChange={props.onNameChange} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.onNumberChange} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;

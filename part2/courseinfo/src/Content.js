import Part from "./Part.js";

const Content = (props) => {
  const partComponents = props.parts.map((item, index) => (
    <Part key={index} name={item.name} exercises={item.exercises} />
  ));

  return <div>{partComponents}</div>;
};

export default Content;

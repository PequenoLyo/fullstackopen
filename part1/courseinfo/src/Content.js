import Part from "./Part.js";

const Content = (props) => {
  console.log(props.PartsAndExercises);
  const partComponents = props.partsAndExercises.map((item, index) => (
     <Part key={index} part={item[0]} exercises={item[1]} />
  ));  

  return <div>{partComponents}</div>;
};

export default Content;

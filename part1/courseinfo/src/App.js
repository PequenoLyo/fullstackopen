import Header from "./Header.js";
import Content from "./Content.js";
import Total from "./Total.js";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const partsAndExercises = [
    [part1, exercises1],
    [part2, exercises2],
    [part3, exercises3],
  ];

  return (
    <div>
      <Header course={course} />
      <Content partsAndExercises={partsAndExercises} />
      <Total />
    </div>
  );
};

export default App;

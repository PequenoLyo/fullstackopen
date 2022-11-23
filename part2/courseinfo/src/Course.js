import Header from './Header.js';
import Content from './Content.js';
import Total from './Total.js';

const Course = (props) => {
  const numberOfExercises = props.course.parts.reduce(
    (s, p) => s + p.exercises,
    0
  );

  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <p>
        <b>total of {numberOfExercises} exercises</b>
      </p>
    </div>
  );
};

export default Course;

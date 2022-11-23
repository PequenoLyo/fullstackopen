import Header from './Header.js';
import Content from './Content.js';
import Total from './Total.js';

const Course = (props) => {

    


  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />      
    </div>
  );
};

export default Course;

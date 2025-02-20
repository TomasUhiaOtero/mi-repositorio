import React from "react";

const Header = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );
  

  const Content = ({ parts }) => (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );

  const Course = ({ course }) => (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  );
  
export default Course;
const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name}: {exercises}
  </p>
);


const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total exercises: {totalExercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    { name: "Fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];

  return (
    <>
      <Header title={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

export default App
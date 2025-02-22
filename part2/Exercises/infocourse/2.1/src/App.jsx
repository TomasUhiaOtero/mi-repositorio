import React from 'react'
import Course from './components/Course'
import './components/Total'

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          id: 1,
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          id: 2,
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          id: 3,
          name: 'State of a component',
          exercises: 14
        },
      ]
    }
    
  ]


  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}



export default App

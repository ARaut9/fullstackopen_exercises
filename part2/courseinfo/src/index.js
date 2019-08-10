import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const App = () => {
  const course = [
    {
      name: 'half stack application developemrnt',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 7,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 3,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Developemrnt Curriculum</h1>
      <Course course={course[0]} />
      <Course course={course[1]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({ parts }) => {
  const total = parts.reduce((prv, cur) => prv + cur.exercises, 0)
  return (
    <div>
      {parts.map((part) =>
        <Part part={part.name} exercises={part.exercises} key={part.id} />)}

      <h3>Total of {total} exercises</h3>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content
        parts={course.parts}
      />
    </div>
  )
}

export default Course

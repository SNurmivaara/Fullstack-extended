import React from 'react'

const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1> {course.name} </h1>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part => 
          <Part name={part.name} exercises={part.exercises} />
        )}
      </>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <>
        <p>{name} {exercises}</p>
      </>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((previous, current) => previous + current.exercises, 0)
    return (
      <>
        <b>total of {total} exercises</b>
      </>
    )
  }

  export default Course
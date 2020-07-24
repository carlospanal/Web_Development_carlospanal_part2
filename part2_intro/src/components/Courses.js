import React from 'react'

const Header2 = (props) => {

  return (
    <div>
      <h2>{props.header}</h2>
    </div>
  )
}

const Content = ({parts}) => {
  
  return (
    <div>
      <ul>
        {parts.map(part => 
          <li key={part.id}>
            {part.name} {part.exercises} 
          </li>
        )}
      </ul>
    </div>
  )
}

const Total = ({parts}) => {
 
  let total_number = parts.reduce((tot,part) => {
    return tot + part.exercises
  },0)
  
  return (
    <div>
      <p>
      Total amount of exercises <b>{total_number}</b>
      </p>
    </div>
  )
}

const Course = ({course}) => {

  return (
    <>
      
      <Header2 header={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    
    </>
  )
}

const Courses = ({courses}) => {

  return (
    <div>
        {courses.map(curr_course => 
          <Course key={curr_course.id} course={curr_course}/>
        )}
    </div>
  )
}

export default Courses
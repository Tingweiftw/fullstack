import React from 'react'

const Title = ({text}) => <h2>{text}</h2>

const Part = ({data}) => {
    return (
        <div>{data.name} {data.exercises}</div>
    )
}

const Total = ({parts}) => {
    const total_num = parts.reduce(
        (prevValue, currentValue) => prevValue + currentValue.exercises, // function here
        0 //initial value
    )
    return (
        <b>total of {total_num} exercises</b>
    )
}

const Course = ({course}) => {
    const {id, name, parts} = course
    return (
        <div>
            <Title text = {name}/>
            {parts.map(part =>
                <Part key={part.id} data={part}/>
            )}
            <Total parts = {parts}/>
        </div>
    )
}
  
export default Course
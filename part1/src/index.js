import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    );
}

const Content = (props) => {
    return (
        <div>
            <Part part="" exercises=""/>
            <Part part="" exercises=""/>
            <Part part="" exercises=""/>
        </div>
    );
}

const Total = (props) => {
    return (
        <h3>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</h3>
        
    );
}

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

import React from 'react';

const Course = ({course}) => {
    return (
      <>
        <Header header={course.name}/>
        <Content parts={course.parts}/>
      </>
    )
  
  }
  
  const Header = ({header}) => (<h2>{header}</h2>)
  
  const Content = ({parts}) => {
    const allParts = parts.map(item => <Part key={item.id} item={item}/>);
    return (
      <>
        {allParts}
        <Sum sum={parts.reduce((x, y) => x + y.exercises, 0)}/>
      </>
    )
    
  }
  
  const Part = ({item}) => {
    return (
      <p>{item.name}: {item.exercises}</p>
    )
  }
  
  const Sum = ({sum}) => {
    const plural = sum > 1 ? 's':'';
    return (
      <p><strong>total of {sum} exercise{plural}</strong></p>
    )
  }
  

  export default Course;
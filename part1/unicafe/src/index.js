import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Rate = ({onClick, name}) => {
    return (
        <button onClick={onClick}>{name}</button>
    );
}

const Statistics = ({appState}) =>{
    return (
        <table>
            <tbody>
                <Statistic text="good" value={appState[0]} />
                <Statistic text="bad" value={appState[1]} />
                <Statistic text="bad" value={appState[2]} />
                <Statistic text="all" value={appState[3]} />
                <Statistic text="average" value={appState[4]} />
                <Statistic text="positive" value={appState[5]} />
            </tbody>
        </table>
    );
}

const Statistic = ({text, value}) =>{
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  
  const getAll = () =>  (good + neutral + bad);
  const getAverage = () =>  getAll() !== 0 ? (good * 1 + neutral * 0 + bad * -1) / getAll() : 0;
  const getPositive = () =>  getAll() !== 0 ? ((good * 1) / getAll() * 100) + '%' : 0;

  const appState = [good, neutral, bad, getAll(), getAverage(), getPositive()];
  return (
      <div>
        <h1>give feedback</h1>
        <Rate onClick={handleGood} name="good"/>
        <Rate onClick={handleNeutral} name="neutral"/>
        <Rate onClick={handleBad} name="bad"/>
        <h1>statistics</h1>
        {getAll() === 0 ? <p>No feedback given</p> : <Statistics appState={appState} />}
      </div>
  );
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
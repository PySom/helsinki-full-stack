import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  //Array(6).fill(0) learnt from octopus on stackoverflow
  const [voteResults, setVoteResults] = useState(Array(6).fill(0));
  const handleRandomness = () => {
      const randomIndex = Math.floor(Math.random() * anecdotes.length);
      setSelected(randomIndex);
  }

  const getHighestVoteIndex = () =>  voteResults.indexOf(Math.max(...voteResults));

  const handleVote = () => {
      //I won't loose previous values;
    const newVoteResult = [...voteResults];
    newVoteResult[selected] += 1;
    setVoteResults(newVoteResult);
  }
  return (
    <div>
        <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <Result total = {voteResults[selected]}/>
      <Vote onClick={handleVote} />
      <Button onClick={handleRandomness} />
      <h1>Anecdote with most votes</h1>
      {
        voteResults[getHighestVoteIndex()] === 0 ? <p>No votes yet</p> : 
        <Highest 
        message={props.anecdotes[getHighestVoteIndex()]} 
        highestVote={voteResults[getHighestVoteIndex()]}/>
      }
           
    </div>
  )
}

const Button = ({onClick}) => {
    return (
        <button onClick={onClick}> next anecdote </button>
    )
}

const Vote = ({onClick}) => {
    return (
        <button onClick={onClick}> vote </button>
    )
}

const Highest = ({message, highestVote}) => {
    return (
        <div>
            <p>{message}</p>
            <Result total={highestVote}/>
        </div>
        
    )
}

const Result = ({total}) => {
    return (
        <p> has {total} </p>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
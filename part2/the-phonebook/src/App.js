import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newContact, setnewContact ] = useState({name: "", number: ""})
  const [ filterValue, setFilterValue ] = useState('')
  const handleNameChange = (event) => {
    setnewContact({...newContact, name: event.target.value});
  }
  const handleFilter = (event) => setFilterValue(event.target.value);
  const filteredPeople = filterValue != null ?
                   persons.filter(person => person.name.includes(filterValue)):
                   persons;
  
  const handleNumberChange = (event) => {
    setnewContact({...newContact, number: event.target.value});
  }
  const addContact = (event) =>{
    event.preventDefault();
    if(persons.filter(person => person.name === newContact.name).length === 1)
    {
      alert(`${newContact.name} is already added to the phone book`);
      return;
    }
    setPersons(persons.concat(createPersonObject(newContact)));
  }
  const createPersonObject = (contact) => [{name: contact.name, number: contact.number}]
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} onChange={handleFilter} />
      <h3>add a new</h3>
      <Form onSubmit = {addContact} name = {newContact.name} onNameChange={handleNameChange}
            number = {newContact.number} onNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPeople}/>
    </div>
  )
}
const Persons = ({persons}) => persons.map((person) => <Person key={person.name} person={person}/>);

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.name} onChange={props.onNameChange}/>
      </div>
      <div>
        number: <input value={props.number} onChange={props.onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
}

const Filter = (props) => {
  return (
    <div>
      <strong>filter shown with </strong><input value={props.filterValue} onChange={props.onChange}/>
    </div>
  )
}
const Person = ({person}) => (<p>{person.name} {person.number}</p>)
export default App

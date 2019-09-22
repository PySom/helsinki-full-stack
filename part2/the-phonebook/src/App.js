import React, { useState, useEffect } from 'react'
import phonebookservice from './phonebookservice';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newContact, setnewContact ] = useState({name: "", number: ""})
  const [ filterValue, setFilterValue ] = useState('')
  const [ successStatus, setSuccessStatus ] = useState(null)

  useEffect(() => {
    phonebookservice
      .all()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])
  
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
  const handleUpdate = () => {
    const personInList = persons.find(x => x.name === newContact.name);
    const updateUser = {...personInList, number: newContact.number}
    if(updateUser.number && updateUser.number !== personInList.number ){
        confirmBeforeAction(() => phonebookservice
                                    .update(updateUser)
                                    .then(updatedUser => 
                                              setPersons(persons.map(p => p.id !== updatedUser.id ? 
                                                p : updatedUser))),
                            `${newContact.name} is already added to the database, replace the old number
                              with the new one?`)
    }
    
  }

  const confirmBeforeAction = (callback, message) => {
    if(window.confirm(message)){
      callback();
    }
  }

  const deleteContact = (event, id) => {
    event.preventDefault();
    const person = persons.find(person => person.id === id);
    if(person !== undefined)
    confirmBeforeAction(() => phonebookservice
                                .remove(id)
                                .then(() => setPersons(persons.filter(person => 
                                  person.id !== id)))
                                .catch(() => 
                                  {
                                    statusMessageHandler(`Information of ${person.name} has already been removed from the server`, 
                                    "error")
                                  }
                                  ),
    `Delete ${person.name}?`)
    
  }
  const statusMessageHandler = (message, className) =>{
    setSuccessStatus({message, className});
    setTimeout(() => {
      setSuccessStatus(null)
    }, 5000);
  }
  const addContact = (event) =>{
    event.preventDefault();
    if(persons.filter(person => person.name === newContact.name).length === 1)
    {
      handleUpdate();
      return;
    }
    phonebookservice
      .create(createPersonObject(newContact))
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        statusMessageHandler(`Added ${newPerson.name}`, "success")
      })
  }
  const createPersonObject = (contact) => {return {name: contact.name, number: contact.number}}
  return (
    <div>
      <h2>Phonebook</h2>
      {successStatus !== null ?
        <Notification message={successStatus.message} className={successStatus.className}/>:
        <></>
       }
      <Filter filterValue={filterValue} onChange={handleFilter} />
      <h3>add a new</h3>
      <Form onSubmit = {addContact} name = {newContact.name} onNameChange={handleNameChange}
            number = {newContact.number} onNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPeople} removeHandler={deleteContact}/>
    </div>
  )
}
const Persons = ({persons, removeHandler}) => persons.map((person) => 
            <div  key={person.name}>
              <Person person={person}/>
              <Remove removeHandler={removeHandler} id={person.id}/>
            </div>
            );

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

const Remove = ({removeHandler, id}) => <><button onClick={(event) => removeHandler(event, id)}>delete</button><br/></>
const Person = ({person}) => (<span>{person.name} {person.number}</span>)

const Notification = ({message, className}) => <p className={className}>{message}</p>
export default App

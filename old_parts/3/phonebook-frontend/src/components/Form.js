import { useState } from 'react'
import Input from './Input'
import personService from '../services/persons'

const Form = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
  
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const resetMessage = () => setTimeout(() => {
      setNotification(null)
    }, 5000)
  
    if (persons.some(p => p.name === newName)) {
      if(window.confirm(`${newName} is already in the phonebook, update the number?`)){
        const toUpdate = persons.find(p => p.name === newName)
        personService
          .update(toUpdate.id, newPerson)
          .then(newPerson => {
            setPersons(persons.map(person => person.id !== toUpdate.id ? person : newPerson))
            setNotification(`${newPerson.name} updated succesfully`)
            resetMessage()
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`${newPerson.name} added succesfully`)
          resetMessage()
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

    return (
        <form onSubmit={addNumber}>
          <Input name="name" value={newName} onChange={handleNameChange} />
          <Input name="number" value={newNumber} onChange={handleNumberChange} />
            <div>
              <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form
import { useState } from 'react'
import Input from './Input'

const Form = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
  
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
  
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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
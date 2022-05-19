import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Form from './components/Form'
import Input from './components/Input'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)){
      personService
        .erase(person.id)
        .then(setPersons(persons.filter(p => p.id !== person.id)))
    }
  } 

  const filteredPersons = filter.length > 0 ? persons.filter(person => (person.name.toLowerCase()).includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Input name="filter shown with" value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <Form persons={persons} setPersons={setPersons} setNotification={setNotification} />
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Person key={person.id} person={person} deleteAction={() => deletePerson(person)} />)}
    </div>
  )
}

export default App
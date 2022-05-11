import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Form from './components/Form'
import Input from './components/Input'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = filter.length > 0 ? persons.filter(person => (person.name.toLowerCase()).includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Input name="filter shown with" value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <Form persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App
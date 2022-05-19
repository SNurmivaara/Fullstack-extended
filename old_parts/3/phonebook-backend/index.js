const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  min = Math.ceil(10000)
  max = Math.floor(5)
  return Math.floor(Math.random() * (max - min) + min)
}

app.get('/info', (request, response) => {
  let res = `<p>Phonebook has info for ${persons.length} people</p>
             <p>${new Date()}</p>`
  response.send(res)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing!'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing!'
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: `${body.name} is already in the phonebook!`
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
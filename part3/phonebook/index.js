const express = require('express')
const morgan = require('morgan')

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'Arto and Hellas',
    number: 'XX-XX-XXXXXXX',
    id: 5,
  },
]

const app = express()
app.use(express.json())
morgan.token('request-body', (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

app.get('/', (request, response) => {
  response.send('<h1>persons api</h1>')
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  !person ? response.status(404).end() : response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const names = persons.map((person) => person.name)
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'information missing',
    })
  } else if (names.includes(body.name.toString())) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }
  const person = {
    name: body.name.toString(),
    number: body.number.toString(),
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  }
  persons = persons.concat(person)
  response.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)

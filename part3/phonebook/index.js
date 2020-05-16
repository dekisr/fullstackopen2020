const express = require('express')

const persons = [
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
  !person
    ? response.status(404).send(`<p>404</p>`)
    : response.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)

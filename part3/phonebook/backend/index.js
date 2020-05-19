require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

// ...past exercises
// let persons = [
//   {
//     name: 'Arto Hellas',
//     number: '040-123456',
//     id: 1,
//   },
//   {
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//     id: 2,
//   },
//   {
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//     id: 3,
//   },
//   {
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//     id: 4,
//   },
//   {
//     name: 'Arto and Hellas',
//     number: 'XX-XX-XXXXXXX',
//     id: 5,
//   },
// ]

const app = express()
app.use(cors())
app.use(express.json())
morgan.token('request-body', (request, response) => {
  return JSON.stringify(request.body)
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :request-body'
  )
)
app.use(express.static('build'))

// app.get('/', (request, response) => {
//   response.send('<h1>persons api</h1>')
// })

// already done
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})
app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then((result) => {
      response.send(`
      <p>Phonebook has info for ${result} people</p>
      <p>${new Date()}</p>
    `)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = Person.find((person) => person.id === id)
  // !person ? response.status(404).end() : response.json(person)
  Person.findById(request.params.id)
    .then((person) => {
      !person ? response.status(404).end() : response.json(person)
    })
    .catch((error) => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
  const number = request.body.number
  Person.findByIdAndUpdate(request.params.id, { number }, { new: true })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = persons.find((person) => person.id === id)
  // persons = persons.filter((person) => person.id !== id)
  // !person ? response.status(404).end() : response.status(204).end()
  Person.findByIdAndRemove(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  // const body = request.body
  // const names = persons.map((person) => person.name)
  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: 'information missing',
  //   })
  // } else if (names.includes(body.name.toString())) {
  //   return response.status(400).json({
  //     error: 'name must be unique',
  //   })
  // }
  // const person = {
  //   name: body.name.toString(),
  //   number: body.number.toString(),
  //   id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  // }
  // persons = persons.concat(person)
  // response.json(person)
  const body = request.body
  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: 'information missing',
  //   })
  // }
  const person = new Person({
    name: body.name.toString(),
    number: body.number.toString(),
  })
  // Person.find({ name: body.name })
  //   .then((result) => {
  //     return result.length
  //       ? response.status(400).json({
  //           error: 'name must be unique',
  //         })
  //       : person.save().then((savedPerson) => {
  //           response.json(savedPerson)
  //         })
  //   })
  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => response.json(savedAndFormattedPerson))
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error('Error', error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

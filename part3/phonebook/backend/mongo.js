const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.group()
  console.log('Please provide the correct arguments:')
  console.log('- List all entries: node mongo.js <password>')
  console.log('- Add person: node mongo.js <passowrd> <name> <number>')
  console.groupEnd()
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}` +
  `@cluster0-kvbvk.mongodb.net/` +
  `phonebook?retryWrites=true&w=majority`
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(() => console.log('Connection Error'))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({})
    .then((persons) => {
      console.group()
      console.log('phonebook:')
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      console.groupEnd()
      return mongoose.connection.close()
    })
    .then(() => process.exit(1))
    .catch((error) => console.log('Error', error))
}

const name = process.argv[3]
const number = process.argv[4]
const person = new Person({
  name,
  number,
})

name &&
  person
    .save()
    .then((result) => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
    .catch((error) => {
      console.log('Error', error)
      mongoose.connection.close()
    })

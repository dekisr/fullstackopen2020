const initialAuthors = [
  {
    _id: ObjectId('5a422a851b54a676234d17f7'),
    name: 'Robert Martin',
    born: 1952,
  },
  {
    _id: ObjectId('5a422aa71b54a676234d17f8'),
    name: 'Martin Fowler',
    born: 1963,
  },
  {
    _id: ObjectId('5a422b3a1b54a676234d17f9'),
    name: 'Fyodor Dostoevsky',
    born: 1821,
  },
  {
    _id: ObjectId('5a422b891b54a676234d17fa'),
    name: 'Joshua Kerievsky', // birthyear not known
  },
  {
    _id: ObjectId('5a422ba71b54a676234d17fb'),
    name: 'Sandi Metz', // birthyear not known
  },
]

const initialBooks = [
  {
    title: 'Clean Code',
    published: 2008,
    author: ObjectId('5a422a851b54a676234d17f7'),
    id: new ObjectId(),
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: ObjectId('5a422a851b54a676234d17f7'),
    id: new ObjectId(),
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: ObjectId('5a422aa71b54a676234d17f8'),
    id: new ObjectId(),
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: ObjectId('5a422b891b54a676234d17fa'),
    id: new ObjectId(),
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: ObjectId('5a422ba71b54a676234d17fb'),
    id: new ObjectId(),
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: ObjectId('5a422b3a1b54a676234d17f9'),
    id: new ObjectId(),
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: ObjectId('5a422b3a1b54a676234d17f9'),
    id: new ObjectId(),
    genres: ['classic', 'revolution'],
  },
]

db.authors.deleteMany({})
db.books.deleteMany({})
db.authors.insertMany(initialAuthors)
db.books.insertMany(initialBooks)

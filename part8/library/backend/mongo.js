const initialAuthors = [
  {
    _id: ObjectId('5a422a851b54a676234d17f7'),
    name: 'Robert Martin',
    born: 1952,
    booksIds: [
      ObjectId('5ef8a08675592dae320c7da2'),
      ObjectId('5ef8a08675592dae320c7da3'),
    ],
  },
  {
    _id: ObjectId('5a422aa71b54a676234d17f8'),
    name: 'Martin Fowler',
    born: 1963,
    booksIds: [ObjectId('5ef8a08675592dae320c7da4')],
  },
  {
    _id: ObjectId('5a422b3a1b54a676234d17f9'),
    name: 'Fyodor Dostoevsky',
    born: 1821,
    booksIds: [
      ObjectId('5ef8a08675592dae320c7da7'),
      ObjectId('5ef8a08675592dae320c7da8'),
    ],
  },
  {
    _id: ObjectId('5a422b891b54a676234d17fa'),
    name: 'Joshua Kerievsky', // birthyear not known
    booksIds: [ObjectId('5ef8a08675592dae320c7da5')],
  },
  {
    _id: ObjectId('5a422ba71b54a676234d17fb'),
    name: 'Sandi Metz', // birthyear not known
    booksIds: [ObjectId('5ef8a08675592dae320c7da6')],
  },
]

const initialBooks = [
  {
    _id: ObjectId('5ef8a08675592dae320c7da2'),
    title: 'Clean Code',
    published: 2008,
    author: ObjectId('5a422a851b54a676234d17f7'),
    genres: ['refactoring'],
  },
  {
    _id: ObjectId('5ef8a08675592dae320c7da3'),
    title: 'Agile software development',
    published: 2002,
    author: ObjectId('5a422a851b54a676234d17f7'),
    genres: ['agile', 'patterns', 'design'],
  },
  {
    _id: ObjectId('5ef8a08675592dae320c7da4'),
    title: 'Refactoring, edition 2',
    published: 2018,
    author: ObjectId('5a422aa71b54a676234d17f8'),
    genres: ['refactoring'],
  },
  {
    _id: ObjectId('5ef8a08675592dae320c7da5'),
    title: 'Refactoring to patterns',
    published: 2008,
    author: ObjectId('5a422b891b54a676234d17fa'),
    genres: ['refactoring', 'patterns'],
  },
  {
    _id: ObjectId('5ef8a08675592dae320c7da6'),
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: ObjectId('5a422ba71b54a676234d17fb'),
    genres: ['refactoring', 'design'],
  },
  {
    _id: ObjectId('5ef8a08675592dae320c7da7'),
    title: 'Crime and punishment',
    published: 1866,
    author: ObjectId('5a422b3a1b54a676234d17f9'),
    genres: ['classic', 'crime'],
  },
  {
    _id: ObjectId('5ef8a08675592dae320c7da8'),
    title: 'The Demon ',
    published: 1872,
    author: ObjectId('5a422b3a1b54a676234d17f9'),
    genres: ['classic', 'revolution'],
  },
]

db.authors.deleteMany({})
db.books.deleteMany({})
db.authors.insertMany(initialAuthors)
db.books.insertMany(initialBooks)

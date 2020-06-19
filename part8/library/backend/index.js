require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

const MONGODB_URI = process.env.MONGODB_URI
mongoose.set('useFindAndModify', false)
console.log('connecting to', MONGODB_URI)
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addAuthor(name: String!, born: Int): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      // const books = await Book.find({}).populate('author')
      // switch (true) {
      //   case !!args.author && !args.genre:
      //     return books.filter((book) => book.author.name === args.author)
      //   case !!args.genre && !args.author:
      //     return books.filter((book) => book.genres.includes(args.genre))
      //   case !!args.genre && !!args.author:
      //     return books.filter(
      //       (book) =>
      //         book.author.name === args.author &&
      //         book.genres.includes(args.genre)
      //     )
      //   default:
      //     return books
      // }

      switch (true) {
        case !!args.author && !args.genre: {
          try {
            const author = await Author.findOne({ name: args.author })
            const books = await Book.find({
              author: author && author._id,
            }).populate('author')
            return books.map((book) => {
              book.author.bookCount = books.length
              return book
            })
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }
        case !!args.genre && !args.author: {
          try {
            const books = await Book.find({
              genres: { $in: [args.genre] },
            }).populate('author')
            return books.map(async (book) => {
              const authorBooks = await Book.find({ author: book.author._id })
              book.author.bookCount = authorBooks.length
              return book
            })
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }
        case !!args.genre && !!args.author: {
          try {
            const author = await Author.findOne({ name: args.author })
            const books = await Book.find({
              author: author && author._id,
              genres: { $in: [args.genre] },
            }).populate('author')
            return books.map(async (book) => {
              const authorBooks = await Book.find({ author: book.author._id })
              book.author.bookCount = authorBooks.length
              return book
            })
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }
        default:
          return await Book.find({}).populate('author')
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors.map(async (author) => {
        const authorBooks = await Book.find({ author: author._id })
        author.bookCount = authorBooks.length
        return author
      })
    },
  },
  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      try {
        const author =
          (await Author.findOne({ name: args.author })) ||
          new Author({ name: args.author })
        await author.save()
        book.author = author.id
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        await author.save()
        const authorBooks = await Book.find({ author: author._id })
        author.bookCount = authorBooks.length
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

require('dotenv').config()
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  PubSub,
  gql,
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const pubsub = new PubSub()

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */
const JWT_SECRET = process.env.JWT_SECRET
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
    booksIds: [String!]!
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => {
      return root.booksIds.length
    }
  },
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
            // return books.map((book) => {
            //   book.author.bookCount = books.length
            //   return book
            // })
            return books
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
            // return books.map(async (book) => {
            //   const authorBooks = await Book.find({ author: book.author._id })
            //   book.author.bookCount = authorBooks.length
            //   return book
            // })
            return books
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
            // return books.map(async (book) => {
            //   const authorBooks = await Book.find({ author: book.author._id })
            //   book.author.bookCount = authorBooks.length
            //   return book
            // })
            return books
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
      try {
        const authors = await Author.find({})
        // return authors.map(async (author) => {
        //   const authorBooks = await Book.find({ author: author._id })
        //   author.bookCount = authorBooks.length
        //   return author
        // })
        return authors
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
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
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const book = new Book({ ...args })
      try {
        const author =
          (await Author.findOne({ name: args.author })) ||
          new Author({ name: args.author })
        author.booksIds = [...author.booksIds, book.id]
        await author.save()
        book.author = author.id
        await book.save()
        await book.populate('author').execPopulate()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        // return Book.findOne({ title: args.title }).populate('author')
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        await author.save()
        // const authorBooks = await Book.find({ author: author._id })
        // author.bookCount = authorBooks.length
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.map((blog) => blog.likes).sort((a, b) => b - a)[0]
  return mostLikes
    ? blogs.filter((blog) => blog.likes === mostLikes)
    : 'There is no post with likes yet.'
}

const mostBlogs = (blogs) => {
  const authors = blogs
    .map((blog) => blog.author)
    .filter((author, index, array) => {
      return array.indexOf(author) === index
    })
  const countBlogs = authors.map((author) => {
    return {
      author,
      blogs: blogs.filter((blog) => blog.author === author).length,
    }
  })
  return countBlogs.sort((a, b) => b.blogs - a.blogs)[0]
}

const mostLikes = (blogs) => {
  const authors = blogs
    .map((blog) => blog.author)
    .filter((author, index, array) => {
      return array.indexOf(author) === index
    })
  const countLikes = authors.map((author) => {
    return {
      author,
      likes: blogs
        .filter((blog) => blog.author === author)
        .reduce((acc, blog) => {
          return acc + blog.likes
        }, 0),
    }
  })
  return countLikes.sort((a, b) => b.likes - a.likes)[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

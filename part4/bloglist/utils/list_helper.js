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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

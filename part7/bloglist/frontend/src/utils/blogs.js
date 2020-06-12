export const sortByLikes = (blogsArray) => {
  const sortedBlogs = [...blogsArray].sort((a, b) => b.likes - a.likes)
  return sortedBlogs
}

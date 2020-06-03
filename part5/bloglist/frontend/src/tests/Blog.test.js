import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Author Test',
    url: 'urltest',
    likes: 123,
  }
  const mockHandler = jest.fn() // PropTypes...
  const component = render(
    <Blog blog={blog} updateBlog={mockHandler} remove={mockHandler} />
  )
  // const blogDiv = component.container.querySelector('div')
  const blogHeader = component.container.querySelector('h3')
  const blogContent = component.container.querySelector('ul')
  console.log('what?', blogContent)
  // component.debug()
  test('display the blog’s title', () => {
    expect(blogHeader).toHaveTextContent('Test Blog')
  })
  test('display the blog’s author', () => {
    expect(blogHeader).toHaveTextContent('Author Test')
  })
  test('does not render the url or likes', () => {
    expect(blogContent).toBe(null)
  })
})

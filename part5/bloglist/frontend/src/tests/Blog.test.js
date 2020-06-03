import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Author Test',
    url: 'urltest',
    likes: 123,
    user: { name: 'Tester' },
  }
  let component
  const mockHandler = jest.fn() // PropTypes...
  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockHandler} remove={mockHandler} />
    )
  })
  // component.debug()
  test('display the blog’s title', () => {
    const blogHeader = component.container.querySelector('h3')
    expect(blogHeader).toHaveTextContent('Test Blog')
  })
  test('display the blog’s author', () => {
    const blogHeader = component.container.querySelector('h3')
    expect(blogHeader).toHaveTextContent('Author Test')
  })
  test('does not render the url or likes', () => {
    const blogContent = component.container.querySelector('ul')
    expect(blogContent).toBe(null)
  })
  test('url and likes are shown when the view button has been clicked.', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const blogContent = component.container.querySelector('ul')
    expect(blogContent).toHaveTextContent('urltest')
    expect(blogContent).toHaveTextContent('likes 123')
  })
})

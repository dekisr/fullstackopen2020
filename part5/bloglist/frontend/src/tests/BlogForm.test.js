import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogForm createBlog={mockHandler} setNotification={mockHandler} />
    )
  })
  test('clicking the like button twice.', () => {
    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    fireEvent.change(title, {
      target: { value: 'Test Title' },
    })
    fireEvent.change(author, {
      target: { value: 'Test Author' },
    })
    fireEvent.change(url, {
      target: { value: 'Test Url' },
    })
    fireEvent.submit(form)
    expect(mockHandler.mock.calls[0][0].title).toBe('Test Title')
    expect(mockHandler.mock.calls[0][0].author).toBe('Test Author')
    expect(mockHandler.mock.calls[0][0].url).toBe('Test Url')
  })
})

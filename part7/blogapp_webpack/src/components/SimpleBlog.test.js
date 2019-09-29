import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders title, author, and likes', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    likes: 17
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'blog title'
  )

  expect(component.container).toHaveTextContent(
    'blog author'
  )

  expect(component.container).toHaveTextContent(
    '17'
  )
})

test('clicking the like button twice calls event handler twice', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    likes: 17
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      likes: 17
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('at start only name and author are displayed and more information about blog is not displayed', () => {
    const moreInfo = component.container.querySelector('.moreInfo')

    expect(moreInfo).toBeNull()
  })

  test('after clicking on the blog title, more information about blog is displayed', () => {
    const blogTitle = component.container.querySelector('.blogTitle')
    fireEvent.click(blogTitle)

    const div = component.container.querySelector('.moreInfo')
    expect(div).not.toBeNull()
  })
})
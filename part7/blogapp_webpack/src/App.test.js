import React from 'react'
import { Provider } from 'react-redux'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
import store from './store'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    component.rerender(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await waitForElement(
      () => component.getByText('Log In')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('if a user is logged, blogs are  rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    component.rerender(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(6)

    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(component.container).toHaveTextContent(
      'Canonical string reduction'
    )
    expect(component.container).toHaveTextContent(
      'First class tests'
    )
    expect(component.container).toHaveTextContent(
      'TDD harms architecture'
    )
    expect(component.container).toHaveTextContent(
      'Type wars'
    )
  })
})
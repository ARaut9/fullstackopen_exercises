import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      data: {
        title: 'test title',
        author: 'test author',
        url: 'https://test.com/test'
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action LIKE_BLOG', () => {
    const state = [
      {
        title: 'test title 1',
        author: 'test author 1',
        url: 'https://test.com/test1',
        likes: 2,
        id: 1
      },
      {
        title: 'test title 2',
        author: 'test author 2',
        url: 'https://test.com/test2',
        likes: 0,
        id: 2
      }
    ]
    const action = {
      type: 'LIKE_BLOG',
      data: {
        id: 2
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState.length).toBe(2)

    expect(newState).toContainEqual(state[0])

    expect(newState).toContainEqual({
      title: 'test title 2',
      author: 'test author 2',
      url: 'https://test.com/test2',
      likes: 1,
      id: 2
    })
  })
})
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author {
      name
    },
    published,
    genres
  }
}`

const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $setBornTo: Int!) {
  editAuthor (
    name: $name,
    setBornTo: $setBornTo
  ) {
    name,
    born
  }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const FAVORITE_GENRE = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
    }
    published
    genres
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

const App = () => {
  const [page, setPage] = useState('books')
  const [errorMessage, setErrorMessage] = useState(null)
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const favoriteGenre = useQuery(FAVORITE_GENRE)
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem('libraryappUserToken')
    setToken(token)
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(`${addedBook.title} addded`)
      updateCacheWith(addedBook)
    }
  })

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })

      const authorToUpdate = dataInStore.allAuthors.find(author =>
        author.name === response.data.editAuthor.name
      )
      authorToUpdate.born = response.data.editAuthor.born

      dataInStore.allAuthors = dataInStore.allAuthors.map(author =>
        author.name !== authorToUpdate.name ? author : authorToUpdate
      )
      store.writeQuery({
        query: ALL_AUTHORS,
        data: dataInStore
      })
    }
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  if (!token) {
    return (
      <div>
        {errorNotification()}
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('login')}>log in</button>

        <Books
          show={page === 'books'}
          result={books}
        />

        <Authors
          show={page === 'authors'}
          result={authors}
        />

        <LoginForm
          show={page === 'login'}
          login={login}
          setToken={(token) => setToken(token)}
          setPage={(page) => setPage(page)}
        />
      </div>
    )
  }

  return (
    <div>
      {errorNotification()}

      <div>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('add book')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={logout}>log out</button>
      </div>

      <Books
        show={page === 'books'}
        result={books}
      />

      <Authors
        show={page === 'authors'}
        result={authors}
        editAuthor={editAuthor}
      />

      <NewBook
        show={page === 'add book'}
        addBook={addBook}
      />

      <Recommended
        show={page === 'recommended'}
        books={books}
        result={favoriteGenre}
      />

    </div>
  )
}

export default App
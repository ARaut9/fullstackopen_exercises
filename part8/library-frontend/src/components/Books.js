import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'

const BOOKS_BY_GENRE = gql`
  query booksByGenre($genreToFilterBy: String) {
    allBooks(genre: $genreToFilterBy) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const Books = ({ show, result }) => {
  const client = useApolloClient()
  const [genre, setGenre] = useState('all genres')
  const [filteredBooks, setFilteredBooks] = useState(null)

  if (!show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  const books = result.data.allBooks
  const genres = books
    .map(book => book.genres)
    .reduce((acc, cur) => acc.concat(cur), [])
    .reduce((acc, cur) => acc.includes(cur) ? acc : acc.concat(cur), [])

  const filterBooks = async (genre) => {
    if (genre === 'all genres') {
      setFilteredBooks(books)
      return
    }

    const { data } = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { genreToFilterBy: genre }
    })

    setGenre(genre)
    setFilteredBooks(data.allBooks)
  }

  const booksToShow = () => {
    if (!filteredBooks) {
      return books
    }
    return filteredBooks
  }

  return (
    <div>
      <h2>books</h2>

      <p>In genre <strong>{genre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
              </th>
            <th>
              published
              </th>
          </tr>
          {booksToShow().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {genres.concat('all genres').map(genre =>
        <button
          key={genre}
          onClick={(event) => filterBooks(event.target.textContent)}
        >
          {genre}
        </button>
      )}
    </div>
  )
}

export default Books
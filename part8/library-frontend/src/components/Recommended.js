import React from 'react'

const Recommended = ({ show, books, result }) => {
  if (!show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  const allBooks = books.data.allBooks
  const favoriteGenre = result.data.me.favoriteGenre
  const recommendedBooks = allBooks.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>

      <p>Books in your favorite genre <strong>{favoriteGenre}</strong></p>

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
          {recommendedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
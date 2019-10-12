import React from 'react'
import UpdateAuthor from './UpdateAuthor'

const Authors = ({ show, result, editAuthor }) => {
  if (!show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {
        // if user is logged in then editAuthor prop will be passed so if it doesn't 
        // exist then the user doesn't have the privilage for this functionality
        editAuthor &&
        <div>
          <h3>Set Birthyear</h3>
          <UpdateAuthor
            authors={authors}
            editAuthor={editAuthor}
          />
        </div>
      }

    </div>
  )
}

export default Authors
import React, { useState } from 'react'

const UpdateAuthor = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState(props.authors[0].name)
  const [birthYear, setBirthYear] = useState('')

  const handleSelectChange = (event) => setSelectedAuthor(event.target.value)
  const handleBirtyearChange = (event) => setBirthYear(Number(event.target.value))

  const handleSubmit = async (event) => {
    event.preventDefault()
    await props.editAuthor({
      variables: {
        name: selectedAuthor,
        setBornTo: birthYear
      }
    })

    setBirthYear('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={selectedAuthor} onChange={handleSelectChange}>
          {props.authors.map(a =>
            <option value={a.name} key={a.name}>{a.name}</option>
          )}
        </select>
        <div>
          born
          <input type="number" onChange={handleBirtyearChange} value={birthYear} />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
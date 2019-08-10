import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(intiialPersons => setPersons(intiialPersons))
  }, [])

  const addNewContact = (event) => {
    event.preventDefault()
    const nameExits = persons.find((person) => person.name === newName)

    if (nameExits) {
      const updateConfirmation =
        window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)
      if (updateConfirmation) {
        const [person] = persons.filter(person => person.name === newName)
        const id = person.id
        const changedPerson = { ...person, number: newNumber }

        personServices
          .update(id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
            setMessage({ msg: `Updated ${newName}`, code: 1 })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(() => {
            setMessage({ msg: `${newName} is already deleted from server`, code: 0 })
          })
      }
    } else {
      const newContact = {
        name: newName,
        number: newNumber
      }

      personServices
        .create(newContact).then(response => {
          setPersons(persons.concat(response.data))
          setMessage({ msg: `${newName} Added`, code: 1 })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value
    const matchedContacts = persons.filter((person) => person.name.toLowerCase().match(searchTerm))
    setPersons(matchedContacts)
  }

  const deletePerson = id => {
    const personName = persons.find(per => per.id === id)
    const deleteConfirmation = window.confirm(`Are you sure you want to delete ${personName.name}`)

    if (deleteConfirmation) {
      const url = `http://localhost:3001/persons/${id}`
      const changedPersons = persons.filter(per => per.id !== id)
      axios
        .delete(url)
        .then(() => {
          setPersons(changedPersons)
          setMessage({ msg: `Deleted ${personName.name}`, code: 1 })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          setMessage({ msg: `${personName.name} is already deleted from server`, code: 0 })
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} />

      <Search onChange={handleSearchChange} />

      <h2>Add new Contact</h2>

      <PersonForm
        onSubmit={addNewContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} deletePerson={deletePerson} />

      <div>name: {newName}</div>
      <div>number: {newNumber}</div>
    </div>
  )
}

export default App
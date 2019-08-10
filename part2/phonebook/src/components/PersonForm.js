import React from "react";

const PersonForm = ({ onSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input onChange={handleNameChange} value={newName} /><br />
        Number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default PersonForm;
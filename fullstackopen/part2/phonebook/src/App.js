import { useState } from 'react'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}

  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')
 


  const addPerson = (event) => {
    event.preventDefault()

    console.log('Add person button clicked', event.target)

    const arrayAux = persons.filter( x => {
      console.log('Un nombre de la lista es', x.name)
      console.log(`El nombre con el que cotejar es ${newName}`)
      return x.name === `${newName}`
    })

    console.log('The filtered array is', arrayAux)

    if (arrayAux.length !== 0) {
      alert(`${newName} is already added to the phonebook`)
    }

    else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
  
      setPersons(persons.concat(personObject))
    }

    setNewNumber('')
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const auxFilter = event.target.value.toLowerCase()
    console.log(auxFilter)
    setNewFilter(auxFilter)
  }

  return (
    <>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} newFilter={newFilter} />

    </>
  )
}

export default App

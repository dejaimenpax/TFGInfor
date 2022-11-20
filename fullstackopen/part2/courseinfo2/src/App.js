import { useState } from 'react'
import Person from './Components/Person'

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

      <form>
        <div>filter shown with
          <input
            value={newFilter}
            onChange={handleFilterChange}
          />
        </div>
      </form>

      <h2>add a new</h2>

      <form onSubmit={addPerson}>

        <div>name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>

        <div>number:
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>

        <div><button type="submit">add</button></div>

      </form>

      {persons
        .filter(x => x.name.toLowerCase().includes(`${newFilter}`))
        .map( y => <Person key={y.id} person={y} />)
      }

    </>
  )
}

export default App

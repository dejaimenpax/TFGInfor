import { useState } from 'react'
import Person from './Components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    console.log('Button clicked', event.target)

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
        id: persons.length + 1,
      }
  
      setPersons(persons.concat(personObject))
    }

    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( x => <Person key={x.id} person={x} />)}
    </div>
  )
}

export default App

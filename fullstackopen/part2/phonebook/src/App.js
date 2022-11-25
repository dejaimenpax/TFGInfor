import { useState, useEffect} from 'react'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Notification from './Components/Notification'

import personService from './Services/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackType, setFeedBackType] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')
 


  const addPerson = (event) => {
    event.preventDefault()

    console.log('Add person button clicked', event.target)

    const arrayAux = persons.filter( x => {
      console.log('Un nombre de la lista es', x.name)
      console.log(`El nombre con el que cotejar es ${newName}`)
      return x.name === `${newName}`
    })

    console.log('The filtered array is', arrayAux)

    if (arrayAux.length===0){

      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(response => {
          setFeedBackType('success')
          setFeedbackMessage(`Added ${newName}`)
          setTimeout(() => {
            setFeedbackMessage('')
            setFeedBackType('')
          }, 5000)
          setPersons(persons.concat(response.data))
        })   
      
    }

    else if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a old one?`)){
      const changedPerson = {...arrayAux[0], number: newNumber}
      personService
        .update(arrayAux[0].id, changedPerson)
        .then(response => {
          setFeedBackType('success')
          setFeedbackMessage(`Number of ${newName} has been changed`)
          setTimeout(()=> {
            setFeedbackMessage('')
            setFeedBackType('')
          }, 5000)
          setPersons(persons.map(x => x.id !== arrayAux[0].id ? x : response.data))
        })
        .catch(error => {
          setFeedBackType('error')
          setFeedbackMessage(`Information of ${newName} has already been removed from the server`)
          setTimeout(()=> {
            setFeedbackMessage('')
            setFeedBackType('')
          }, 5000)
          setPersons(persons.filter(x => x.id !== changedPerson.id))
        })
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

  const erasePerson = (person) => {
    console.log('Entra por el borrado')
    //mucho cuidado como llamamos en Person.js a esta funcion, debe ser como () => erasePerson(id)
    if (window.confirm(`Delete ${person.name}?`)){
      personService
      .erase(person.id)
      .then(response => {
        setPersons(persons.filter(x => x.id!==person.id))
      })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      
      <Notification message={feedbackMessage} type={feedbackType}/>

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

      <Persons persons={persons} newFilter={newFilter} erasePerson={erasePerson} />

    </>
  )
}

export default App

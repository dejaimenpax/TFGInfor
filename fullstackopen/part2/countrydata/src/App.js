/*
FOR WEATHER API PURPOSES:
set "REACT_API_KEY=abcdef" && npm start         IN WINDOWS
REACT_API_KEY=abcdef npm start              IN UNIX
*/



import { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import Countries from './Components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])

  const [newFilter, setNewFilter] = useState('')

  


  useEffect(() => {
    console.log('effect downloading countries')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
      
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    const auxFilter = event.target.value.toLowerCase()
    console.log(auxFilter)
    setNewFilter(auxFilter)
  }

  const handleShowClick = (name) => {
    const auxFilter = name.toLowerCase()
    setNewFilter(auxFilter)
  }


  return (
    <>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries 
        countries={countries} 
        filter={newFilter} 
        handleShowClick={handleShowClick}
      />
    </>
  )
}

export default App;

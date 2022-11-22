import CountryName from "./CountryName";
import CountryData from "./CountryData"


const Countries = ({ countries, filter, handleShowClick }) => {

    const arrayFiltered = countries.filter(x => x.name.toLowerCase().includes(`${filter}`))

    console.log('Filtered array is', arrayFiltered)
    console.log('His length is', arrayFiltered.length)

    if (arrayFiltered.length > 10){
        console.log('Goes throught >10')
        return <p>Too many matches, specify another filter</p>
    }
    else if (arrayFiltered.length>1){
        console.log('Goes throught 1<x<10')
        return (arrayFiltered
            .map( y => <CountryName 
                        key={parseInt(y.numericCode)} 
                        name={y.name} 
                        handleShowClick={handleShowClick}
                        />))
    }
    else if (arrayFiltered.length===1){
        console.log('Goes throught =1')
        console.log('Name is', arrayFiltered[0].name)
        console.log('Population is', arrayFiltered[0].population)
        console.log('Languages are', arrayFiltered[0].languages)
        console.log('Flag is', arrayFiltered[0].flag)
        return(<CountryData
                key={parseInt(arrayFiltered[0].numericCode)}
                name={arrayFiltered[0].name}
                capital={arrayFiltered[0].capital}
                population={arrayFiltered[0].population}
                languages={arrayFiltered[0].languages}
                flag={arrayFiltered[0].flag}
                /> 
                )
    }
    else{
        console.log('Goes throught =0')
        return []
    }

}

export default Countries
import { useEffect, useState } from "react"
import axios from "axios"

const CountryData = (props) => {

    const [weather, setWeather] = useState([])

    useEffect(() => {
        console.log('effect downloading weathers')
        console.log(`Trying to download ${props.capital} info`)
        const api_key = process.env.REACT_APP_API_KEY
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${props.capital}&units=metric&APPID=${api_key}`)
            .then(response => {
                console.log('promise of weather fulfilled')
                setWeather(response.data)
              })
    }, [props.capital])
    console.log('render', weather, 'weather ajjajaja')


    if (weather.length===0){
        return <p>Loading weather...</p>
    }
    else{
        return(
            <>
                <h1>{props.name}</h1>
                <p>capital {props.capital}</p>
                <p>population {props.population}</p>
                <h2>Spoken languages</h2>
                <ul>
                    {props.languages.map(x => 
                        <li key={props.languages.indexOf(x)}>{x.name}</li>)
                    }
                </ul>
                <img 
                    src={`${props.flag}`}
                    alt={`Flag of ${props.name}`}
                    width="150"
                    height="150"
                />
                <h2>Weather in {props.capital.charAt(0).toUpperCase() + props.capital.slice(1)}</h2>
                <p>temperature {weather.main.temp} Celsius</p>
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt='Icon of weather'
                    width="75"
                    height="75"
                />
                <p>wind {weather.wind.speed} m/s</p>

            </>
        )
    }
}

export default CountryData
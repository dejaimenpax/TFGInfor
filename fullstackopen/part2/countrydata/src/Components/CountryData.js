const CountryData = (props) => {
    return(
        <>
            <h1>{props.name}</h1>
            <p>capital {props.capital}</p>
            <p>population {props.population}</p>
            <h2>languages</h2>
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
        </>
    )
}

export default CountryData
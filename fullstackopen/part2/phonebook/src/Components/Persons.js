import Person from "./Person";

const Persons = ({ persons, newFilter}) => {
    return(
        persons
            .filter(x => x.name.toLowerCase().includes(`${newFilter}`))
            .map( y => <Person key={y.id} person={y} />)
    )
}

export default Persons

import Person from "./Person";

const Persons = ({ persons, newFilter, erasePerson}) => {
    return(
        persons
            .filter(x => x.name.toLowerCase().includes(`${newFilter}`))
            .map( y => <Person key={y.id} person={y} erasePerson={erasePerson} />)
    )
}

export default Persons

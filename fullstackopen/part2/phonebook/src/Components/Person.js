
const Person = ({ person, erasePerson }) => {
    return(
        <div>
            {person.name} {person.number}
            <button onClick={() => erasePerson(person)}>delete</button>
        </div>
    )
}

export default Person
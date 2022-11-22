
const CountryName = ({ name, handleShowClick }) => {
    return(
        <div>{name}
            <input
                type='submit'
                value='show'
                onClick={()=>{handleShowClick(name)}}
            />        
        </div>
    )
}

export default CountryName
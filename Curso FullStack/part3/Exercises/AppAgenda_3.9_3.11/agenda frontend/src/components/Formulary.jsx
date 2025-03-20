const Formulary = ({newName, setNewName, addPerson, newNumber, setNewNumber}) => {
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    return (
        <form onSubmit={addPerson}>
            <p>
            <label htmlFor="name">Name:  </label>
            <input type="text" id="name" value={newName} onChange={handleNameChange} />
            </p>

            <p>
            <label htmlFor="number">Number:  </label>
            <input type="text" id="number" value={newNumber} onChange={handleNumberChange} />
            </p>
            
            <button type="submit">Add</button>
        </form>
    );
}

export default Formulary
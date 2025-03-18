const SearchBar = ({ search, setSearch }) => {
    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    return(
        <form>
            <p>
            <label htmlFor="query">Search: </label>
            <input type="text" id="query" value={search} onChange={handleSearch}/>

            </p>
        </form>
    )
}

export default SearchBar
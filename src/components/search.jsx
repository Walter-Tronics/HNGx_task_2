import { useRef } from "react"
import { useMovie } from "../context";


const Search = () => {

    const { queryVal, setQuery } = useMovie();

    const query = useRef(null);

    function search() {
        console.log(query.current.value);
        setQuery(query.current.value);
        window.location = '/search';
        query.current.value = '';
    }

    return(
        <>
            <div className="search_box">
                <input
                ref={query}
                type="text"
                id="query"
                placeholder="What do you want to search?"
                />

                <i onClick={()=> search()} className="fa-solid fa-search"></i>
            </div>
        </>
    )
}

export default Search
import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext(undefined);

let queryInfo = 'Test';


function getQuery(){
    let storedQuery = localStorage.getItem("query");
    storedQuery ? queryInfo = storedQuery : '';
}

getQuery();


export const MovieProvider = ({children}) => {
    const [query, setQuery] = useState(queryInfo);
    
    useEffect(()=>{
        localStorage.setItem("query", query);
    }, [query]);

    return (
        <MovieContext.Provider value={{ query, setQuery }}>
            {children}
        </MovieContext.Provider>
    )
}

export const useMovie = () => useContext(MovieContext)
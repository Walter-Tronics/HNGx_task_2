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

    const BearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWFlNTgyMmM2NTM3ZWNjMGJkNDE5ZDg3OWJhYWRhOCIsInN1YiI6IjY0ZmYyMTliZWIxNGZhMDBlMzA3NmM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R3LifTPiTZk63tbJHatj3dD4ZvUoi-bb7whU20DCrJY";

    const config = {
    headers: { Authorization: `Bearer ${BearerToken}` },
    };
    
    useEffect(()=>{
        localStorage.setItem("query", query);
    }, [query]);

    return (
        <MovieContext.Provider value={{ query, setQuery, config }}>
            {children}
        </MovieContext.Provider>
    )
}

export const useMovie = () => useContext(MovieContext)
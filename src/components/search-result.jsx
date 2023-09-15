import { useState, useEffect } from "react";
import { useMovie } from "../context";
import Card from "./card";
import axios from "axios";


const Result = () => {
    const [data, setData] = useState([]);

    const { query } = useMovie();



    async function fetch(){
        const api_url = `https://api.themoviedb.org/3/search/movie?query=${query}`;

        const BearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWFlNTgyMmM2NTM3ZWNjMGJkNDE5ZDg3OWJhYWRhOCIsInN1YiI6IjY0ZmYyMTliZWIxNGZhMDBlMzA3NmM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R3LifTPiTZk63tbJHatj3dD4ZvUoi-bb7whU20DCrJY";

        const config = {
        headers: { Authorization: `Bearer ${BearerToken}` },
        };

        try{
        const result = await axios.get(api_url, config);
        console.log(result.data.results, result.data.results[0].poster_path);
        setData(result.data.results);
        } catch (error) {
        const result = error.response.data;
        setData(result);
        }
    }


  useEffect(()=> {
    fetch();
  }, []);


  const img_url = 'https://image.tmdb.org/t/p/';

    return Object.keys(data).length > 0 ? (
        <>
            <h1 className="result_head">Showing search results for <i>{query}</i></h1>

            <div className="container">
                {data.map(item => (
                    <Card 
                    key={item.id} 
                    id={item.id}
                    src={`${img_url}original${item.poster_path}`}
                    release={item.release_date}
                    title={item.title}
                    />
                ))}
            </div>
        </>
    ) : 'Loading...';
}

export default Result;
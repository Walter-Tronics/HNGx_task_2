import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import { useMovie } from "../context";


const Featured = () => {
    const [data, setData] = useState([]);

    const { query, setQuery, config} = useMovie();

    async function fetch(){
        const api_url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;

        try{
        const result = await axios.get(api_url, config);
        console.log(result.data.results);
        setData(result.data.results.slice(0, 10));
        } catch (error) {
        const result = error.response.data;
        setData(result);
        }
    }


    useEffect(()=> {
        fetch();
    }, []);


    const img_url = 'https://image.tmdb.org/t/p/';



    return(
        <>
            <div className="featured">
                <div className="heading">
                    <h2>Featured Movie</h2>
                    <span>See more <i className="fa-solid fa-angle-right"></i></span>
                </div>

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
            </div>
        </>
    )
}

export default Featured;
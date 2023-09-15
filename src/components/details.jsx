import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { useMovie } from "../context";
import ReactPlayer from "react-player";
import movieBox from "../assets/tv.png";
import others from "../assets/others.jpeg"

const Details = () => {
    const [data, setData] = useState([]);
    const [video_key, setKey] = useState('');

    const { query, setQuery, config } = useMovie();

    const { id } = useParams();


    async function fetch(){
        const api_url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos,credits`;

        try{
        const result = await axios.get(api_url, config);
        console.log(result.data);
        //set the video key
        setKey(result.data.videos.results.filter(item => item.type == "Trailer" && item.official)[0].key);
        //set the result
        setData(result.data);
        } catch (error) {
        const result = error.response.data;
        console.log(error.response.data);
        setData(result);
        }
    }


    useEffect(()=> {
        fetch();
    }, []);


    const img_url = 'https://image.tmdb.org/t/p/';
    const video_url = 'https://www.youtube.com/watch?v=';


    return Object.keys(data).length > 0 ? (
        <>
            <div className="overall">
                <div className="side_bar">
                    <div className="comp item">
                        <img src={movieBox} height='40px' width='40px'/>
                        <p>MovieBox</p>
                    </div>

                    <ul>
                        <li>
                            <i class="fa-solid fa-house"></i>
                            <span>Home</span>
                        </li>
                        <li>
                            <i class="fa-solid fa-video"></i>
                            <span>Movies</span>
                        </li>
                        <li>
                            <i class="fa-solid fa-tv"></i>
                            <span>TV Series</span>
                        </li>
                        <li>
                            <i class="fa-regular fa-calendar-days"></i>
                            <span>Upcoming</span>
                        </li>
                    </ul>
                </div>


                <div className="mov_details">
                    <div className="sub_details">
                        <div className="video">
                            <ReactPlayer width='100%' height='100%' url={`${video_url}${video_key}`} />
                        </div>

                        <div className="info">
                            <div className="texts">
                                <h4>
                                <span>{data.title}</span>
                                <i class="fa-solid fa-circle"></i> 
                                <span>{data.release_date}</span> 
                                <i class="fa-solid fa-circle"></i>PG-13 
                                <i class="fa-solid fa-circle"></i> 
                                <span>{data.runtime}m</span>
                                <span className="genre">
                                    {data.genres.map(gen => (<span>{gen.name}</span>))}
                                </span>
                                </h4>

                                <p>{data.overview}</p>

                                <p>Director:{' '}
                                <span>
                                {data.credits.crew.filter(item => item.department == "Directing")[0].name}
                                </span>
                                </p>

                                <p>Writers:{' '}
                                <span>
                                {data.credits.crew.filter(item => item.department == "Writing").map((per,i) => (<span>{i > 0 && ', '}{per.name}</span>))}
                                </span>
                                </p>

                                <p>Stars:{' '} 
                                <span>{data.credits.cast.slice(0,4).map((per,i) => (<span>{i > 0 && ', '}{per.name}</span>))}</span>
                                </p>
                            </div>

                            <div className="side">
                                <button>
                                    <i class="fa-solid fa-ticket"></i>
                                    See Showtimes
                                </button>
                                <button>
                                    <i class="fa-solid fa-list"></i>
                                    More watch options
                                </button>

                                <img width='100%' height='120px' src={others}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    ) : 'Loading...';
}

export default Details
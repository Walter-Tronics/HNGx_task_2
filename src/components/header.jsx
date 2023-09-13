import { useState, useEffect } from "react";
import axios from "axios";
import movieBox from "../assets/tv.png";
import imdb from "../assets/IMDB.png";
import tomato from "../assets/tomato.png";
import Search from "./search";


const Header = () => {
    const [data, setData] = useState([]);


  async function fetch(){
    const api_url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

    const BearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWFlNTgyMmM2NTM3ZWNjMGJkNDE5ZDg3OWJhYWRhOCIsInN1YiI6IjY0ZmYyMTliZWIxNGZhMDBlMzA3NmM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R3LifTPiTZk63tbJHatj3dD4ZvUoi-bb7whU20DCrJY";

    const config = {
      headers: { Authorization: `Bearer ${BearerToken}` },
    };

    try{
      const result = await axios.get(api_url, config);
      console.log(result.data.results);
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
  return Object.keys(data).length > 0 ?  (
    <>
        <header>
            <div className='bg'>
                <div className="overlay"></div>
                <img src={`${img_url}original/${data[4].backdrop_path}`} />
            </div>

            <div className="overhead">
                <div className="comp">
                    <img src={movieBox} height='50px' width='50px'/>
                    <p>MovieBox</p>
                </div>

                <Search />

                <div className="menu">
                    <p>Sign in</p>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>

            <div className="overhead_info">
              <h1>{data[4].original_title}</h1>
              <div className="sub_info">
                <div className="sub_icons">
                  <span>
                    <img src={imdb}/> <span>86.0/100</span>
                  </span> 

                  <span>
                    <img src={tomato}/> <span>97%</span>
                  </span>
                </div>

                <p>{data[4].overview}</p>

                <div className="watch_button">
                  <i className="fa-solid fa-play-circle"></i> <span>WATCH TRAILER</span>
                </div>
              </div>
            </div>
        </header>
    </>
  ) : 'Data pending...';
}

export default Header
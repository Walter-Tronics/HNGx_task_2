import { useState } from "react";
import { Link } from "react-router-dom"


const Card = ({id, src, release, title}) => {
    const [fav, setFav] = useState(false);

    function addToFav() {
        setFav(!fav);
    }

    return (
        <>
            <Link to={`/movies/${id}`} className="card">
                <i onClick={e => {
                e.stopPropagation(); 
                addToFav();
                }} 
                className={`fa-solid fa-heart ${fav ? 'fav-icon' : 'fav'}`}></i>

                <div className="poster">
                    <img src={src}/>
                </div>

                <div className="card_info">
                    <span>{release}</span>
                    <h2>{title}</h2>
                </div>
            </Link>
        </>
    )
}

export default Card
import { useState } from "react";
import { Link } from "react-router-dom"


const Card = ({link, id, src, release, title}) => {
    const [fav, setFav] = useState(false);

    function addToFav(e,id) {
        setFav(!fav);
        e.stopPropagation();
    }

    return (
        <>
            <Link to={link} className="card">
                <i onClick={()=> addToFav(id)} className={`fa-solid fa-heart ${fav ? 'fav-icon' : 'fav'}`}></i>
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
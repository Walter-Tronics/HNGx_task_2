import { useParams } from "react-router-dom"


const Details = () => {

    const { id } = useParams();

    return(
        <>
            <div>{id} is the id of the details page</div>
        </>
    )
}

export default Details
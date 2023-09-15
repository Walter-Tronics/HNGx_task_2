import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";
import Featured from "./featured";



const Home = () => {


    return(
        <>
            <Header />
            <Featured />
        </>
    )
}

export default Home
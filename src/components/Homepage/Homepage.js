import './Homepage.css';
import { BsSearch } from "react-icons/bs";
import React, { useEffect } from 'react'



export default function Homepage() {

    return (
        <div className="Homepage">
            <div className="Background"></div>
            <h1 className="title">Job Search</h1>
            <div className="InputBox">
                <input className="Input" type="text" />
                <button className="Enter"><BsSearch className="SearchIcon"/></button>
            </div>
        </div>
    )
}


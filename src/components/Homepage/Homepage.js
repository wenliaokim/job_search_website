import { useState } from 'react';
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import './Homepage.css';

export default function Homepage() {
    const [searchLink, setSearchLink] = useState("/search/");
    const onSearchLinkChange = (event) => setSearchLink("/search/" + event.target.value);
    
    return (
        <div className="Homepage">
            <div className="Background"></div>
            <h1 className="Title">Job Search</h1>
            <div className="InputBox">
                <input className="Input" type="text" onChange={ onSearchLinkChange }/>
                <Link to={searchLink}>
                    <button className="Enter"><BsSearch className="SearchIcon"/></button>
                </Link>
            </div>
        </div>
    )
}


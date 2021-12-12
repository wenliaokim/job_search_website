import { Link } from "react-router-dom";
import './Homepage.css';
import { BsSearch } from "react-icons/bs";
import { useState } from 'react';


export default function Homepage() {
    const [searchLink, setSearchLink] = useState("/searchJobs/");
    const onSearchLinkChange = (event) => setSearchLink("/searchJobs/" + event.target.value);
    
    return (
        <div className="Homepage">
            <div className="Background"></div>
            <h1 className="Title">Job Search</h1>
            <div className="InputBox">
                <input className="Input" type="text" onChange={ onSearchLinkChange }/>
                <Link to={searchLink}><button className="Enter"><BsSearch className="SearchIcon"/></button></Link>
            </div>
        </div>
    )
}


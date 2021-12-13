import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../constant";
import JobPage from "../JobPage/JobPage";
import "./SearchResultsPage.css";

export default function SearchResultsPage() {
    let params = useParams();
    let jobKey = params.key;
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (jobKey) {
            axios.get(API_URL + '/jobsearch/searchJobs/' + jobKey)
            .then(response => {setSearchResults(response.data)})
            .catch(error => console.log(error));
        }
    }, []);

    let jobDiv = [];
    for (let i = 0; i < searchResults.length; i++) {
        let newDiv = <JobPage key={i} job={searchResults[i]}/>
        jobDiv.push(newDiv);
    }

    return (
        <div className="ResultBackground">
            <h1 className="ResultTitle">Search Result:</h1>
            <div className="JobList"> {jobDiv} </div>
        </div>
    )
}
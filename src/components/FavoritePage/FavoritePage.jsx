import { useParams, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import JobPage from "../JobPage/JobPage";
import "./FavResultsPage.css";
import * as Cookies from "js-cookie";

export default function FavoritePage() {

    let username = Cookies.get("username");

    const [favResults, setFavResults] = useState([]);

    useEffect(() => {
        if (username) {
            axios.get('/favorites')
            .then(response => {
                setFavResults(response.data)
            })
            .catch(error => console.log(error));
        }
    }, []);

    let jobDiv = [];
    for (let i = 0; i < favResults.length; i++) {
        let newDiv = <JobPage key={i} jobId={favResults[i]}/>
        jobDiv.push(newDiv);
    }

    return (
        <div>
            { !username ? <Redirect to="/" />
            :
            <div className="ResultBackground">
                <h1 className="ResultTitle">The favorite jobs you saved: </h1>
                <div className="JobList">
                    {jobDiv}
                </div>
            </div>
            }
        </div>
    )
}
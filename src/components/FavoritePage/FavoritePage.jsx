import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import * as Cookies from "js-cookie";
import { API_URL } from "../../constant";
import JobPage from "../JobPage/JobPage";

export default function FavoritePage() {
    let username = Cookies.get("username");
    const [favResults, setFavResults] = useState([]);

    useEffect(() => {
        if (username) {
            axios.post(API_URL + '/favorites', { username: username })
            .then(response => {setFavResults(response.data)})
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
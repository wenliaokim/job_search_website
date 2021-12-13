import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { IoBusinessSharp } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { API_URL } from "../../constant";
import './JobPage.css';

export default function JobPage({ job, jobId }) {
    const [jobDetail, setJobDetail] = useState({
        iconUrl: '',
        _id: '',
        title: '',
        companyName: '',
        location: '',
    });

    useEffect(() => {
        if (job) { setJobDetail(job) }
        if (jobId) {
            axios.get(API_URL + '/jobsearch/searchJobs/JobDetail/' + jobId)
            .then(response => setJobDetail(response.data.jobResponse))
            .catch(error => console.log(error));
        }
    }, []);
    
    return (
        <div className="JobPage">
            <div className="card text-center">
                <div className="card-body">
                    <div><img className="card-img-left icon" src={jobDetail.iconUrl} width="100" height="100" /></div>
                    <div>
                        <h5 className="card-title JobName">{jobDetail.title}</h5>
                        <div className="CompanyAndLocation">
                            <span className="card-title"><IoBusinessSharp /> <b>{jobDetail.companyName}</b></span>
                            <span className="card-title"><GoLocation /> {jobDetail.location}</span>
                        </div>
                        <Link to={`/jobDetail/${jobDetail._id}`}>
                            <button className="btn DetailButton">See Detail</button>
                        </Link>
                    </div>
                </div>          
            </div>
        </div>
    )
}
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoBusinessSharp } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import './JobPage.css';

export default function JobPage({ job, jobId }) {

    const [jobDetail, setJobDetail] = useState({
        _id: '',
        title: '',
        companyName: '',
        location: '',
    });

    useEffect(() => {
        if(job) {setJobDetail(job)}
    }, []);
    
    useEffect(() => {
        if (jobId) {
            axios.get('/jobsearch/searchJobs/JobDetail/' + jobId)
            .then(response => {
                setJobDetail(response.data.jobResponse)
                console.log(response.data)
            })
            .catch(error => console.log(error));
        }
    }, []);
    
    return (
        <div className="JobPage">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title JobName">{jobDetail.title}</h5>
                    {/* <div class="card-text"><FaAddressCard /> {title}</div> */}
                    <div className="CompanyAndLocation">
                        <span className="card-title"><IoBusinessSharp /> <b>{jobDetail.companyName}</b></span>
                        <span className="card-title"><GoLocation /> {jobDetail.location}</span>
                    </div>
                        <Link to={`/jobDetail/${jobDetail._id}`}><button className="btn DetailButton">See Detail</button></Link>
                </div>          
            </div>
        </div>
    )
}
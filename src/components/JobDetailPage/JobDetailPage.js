import { IoBusinessSharp } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import { AiOutlineMail, AiOutlineGlobal } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import "./JobDetailPage.css";

export default function JobDetailPage() {
    const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

    let params = useParams();
    let jobId = params.id;
    const [jobDetail, setJobDetail] = useState({
        _id: '',
        title: '',
        companyName: '',
        location: '',
        jobDescription: JSON.stringify(content),
        employerEmail: '',
        website: '',
        postingDate: ''
    });

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
        <div className="ResultBackground">
        <div className="JobDetail">
            <div class="card">
                <div class="card-header">job detail</div>
                <div class="card-body">
                    <h4 class="card-title">{jobDetail.title}</h4>
                    <div class="CompanyAndLocation">
                        <span class="card-title"><IoBusinessSharp /> <b>{jobDetail.companyName}</b></span>
                        <span class="card-title"><GoLocation /> {jobDetail.location}</span>
                    </div>
                    <div class="card-title postdate"><BsCalendar2Date /> post date: {jobDetail.postingDate.substr(0, 10)}</div>
                    <div className="DescriptionTitle"><b>Description: </b></div>
                    <div className="card-text DescriptionDisplay" dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(jobDetail.jobDescription))}} />
                    <div class="Employer">
                        <span><b>Employeer Info:</b></span>
                        <a href="mailto:m.bluth@example.com" className="card-title"><AiOutlineMail /> {jobDetail.employerEmail}</a>
                        {jobDetail.website ? <span class="card-title"><AiOutlineGlobal /> {jobDetail.website}</span> :<></>}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

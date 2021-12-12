import { IoBusinessSharp } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import { AiOutlineMail, AiOutlineGlobal, AiOutlineHeart } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import "./JobDetailPage.css";
import * as Cookies from "js-cookie";

export default function JobDetailPage() {
    const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

    let params = useParams();
    let jobId = params.id;
    let username = Cookies.get("username");
    const history = useHistory();

    const [jobDetail, setJobDetail] = useState({
        _id: '',
        username: '',
        title: '',
        companyName: '',
        location: '',
        jobDescription: JSON.stringify(content),
        employerEmail: '',
        website: '',
        postingDate: ''
    });

    const [liked, setLiked] = useState("unliked");

    useEffect(() => {
        if (jobId) {
            axios.get('/jobsearch/searchJobs/JobDetail/' + jobId)
            .then(response => {
                setJobDetail(response.data.jobResponse)
                console.log(response.data)
                console.log(jobDetail.username);
            })
            .catch(error => console.log(error));
        }
    }, []);
    
    useEffect(() => {
        if (username) {
            axios.get('/users/checkFav/' + jobId)
            .then(response => {
                console.log(response)
                if(response.data === "liked") setLiked("liked");
                else setLiked("unliked")
                console.log(liked)
            })
            .catch(error => console.log(error));
        }
    }, []);


    const addOrDeleteFav = () => {
        if(username) {
            if(liked === "unliked"){
                axios.post('/favorites/addFavorite', {fav: jobDetail})
                    .then(response => {
                        console.log(response)
                        setLiked("liked")
                    })
                    .catch(error => console.log(error))
                
            } else {
                axios.post('/favorites/deleteFavorite', {fav: jobDetail})
                    .then(response => {
                        console.log(response)
                        setLiked("unliked")
                    })
                    .catch(error => console.log(error))
            }
        } 
        else {
            history.push("/signin")
        }
    }

    const deleteJob = () => {
        axios.delete('/jobsearch/searchJobs/JobDetail/' + jobId)
            .then(() => {
                axios.post('/favorites/deleteFavorite', {fav: jobDetail})
                history.goBack();
            })
            .catch(error => console.log(error));
    }
    
    return (
        <div className="ResultBackground">
        <div className="JobDetail">
            <div class="card">
                <div class="card-header">job detail</div>
                <button class="btn" onClick={()=>{history.goBack()}}>Go back</button>
                <div class="card-body">
                    <h4 class="card-title">{jobDetail.title}</h4>
                    <div class="CompanyAndLocation">
                        <span class="card-title"><IoBusinessSharp /> <b>{jobDetail.companyName}</b></span>
                        <span class="card-title"><GoLocation /> {jobDetail.location}</span>
                    </div>
                    <div class="card-title postdate"><BsCalendar2Date /> post date: {jobDetail.postingDate.substr(0, 10)}</div>
                    <div>
                        <button class="btn btn-danger" onClick={addOrDeleteFav}><AiOutlineHeart/> Like</button>
                        {liked === "liked"?
                            <div>You've liked the job!</div>
                            :
                            <div>Do you want to add to your favorite list?</div>
                        }
                    </div>
                    <div className="DescriptionTitle"><b>Description: </b></div>
                    <div className="card-text DescriptionDisplay" dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(jobDetail.jobDescription))}} />
                    <div class="Employer">
                        <span><b>Employeer Info:</b></span>
                        <a href="mailto:m.bluth@example.com" className="card-title"><AiOutlineMail /> {jobDetail.employerEmail}</a>
                        {jobDetail.website ? <span class="card-title"><AiOutlineGlobal /> {jobDetail.website}</span> :<></>}
                    </div>
                </div>
                {username === jobDetail.username && username ?
                    <div class="card-footer">
                         <Link to={`/editjob/${jobDetail._id}`}><button class="btn btn-secondary updateButton">Edit</button> </Link>
                        <button class="btn btn-secondary" onClick={() => deleteJob()}>Delete</button>
                    </div>
                    : <></>
                }
            </div>
        </div>
        </div>
    )
}

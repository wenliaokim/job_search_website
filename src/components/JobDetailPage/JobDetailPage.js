import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import { AiOutlineMail, AiOutlineGlobal } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { IoBusinessSharp } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import * as Cookies from "js-cookie";
import { API_URL } from "../../constant";
import "./JobDetailPage.css";

export default function JobDetailPage() {
    // for rich text editor
    const content = {
        "entityMap":{},
        "blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]
    };

    let params = useParams();
    let jobId = params.id;
    let username = Cookies.get("username");
    const history = useHistory();

    const [jobDetail, setJobDetail] = useState({
        iconUrl:'',
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
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (jobId) {
            axios.get(API_URL + '/jobsearch/searchJobs/JobDetail/' + jobId)
            .then(response => setJobDetail(response.data.jobResponse))
            .catch(error => {
                console.log(error);
                history.push('/');
            });
        } 
        if (username) {
            axios.post(API_URL + '/users/checkFav/', {jobId: jobId, username: username})
            .then(response => {
                if (response.data === "liked") setLiked(true);
                else setLiked(false)
            })
            .catch(error => console.log(error));
        }
    }, []);
    
    const addOrDeleteFav = () => {
        if(username) {
            if(!liked){
                axios.post(API_URL + '/favorites/addFavorite', {fav: jobDetail, username: username})
                    .then(() => setLiked(true))
                    .catch(error => console.log(error))  
            } else {
                axios.post(API_URL + '/favorites/deleteFavorite', {fav: jobDetail, username: username})
                    .then(() => setLiked(false))
                    .catch(error => console.log(error))
            }
        } 
        else {
            history.push("/signin")
        }
    }

    const deleteJob = () => {
        axios.post(API_URL + '/jobsearch/searchJobs/deleteJob/', { jobId: jobId, username: username })
            .then(() => {
                axios.post(API_URL + '/favorites/deleteFavorite', { fav: jobDetail, username : username })
                history.push('/');
            })
            .catch(error => console.log(error));
    }
    
    return (
        <div className="ResultBackground">
        <div className="JobDetail">
            <div className="card">
                <div className="card-header">
                    <div>job detail</div>
                    <button className="btn btn-outline-light" onClick={()=>{history.goBack()}}>Go back</button>
                </div>
                <div className="card-body">
                    <div className="firstPart">
                        <img className="icon my-3" src={jobDetail.iconUrl} width="100" height="100" />
                        <h4 className="card-title mb-3">{jobDetail.title}</h4>
                        <div className="CompanyAndLocation">
                            <span className="card-title"><IoBusinessSharp /> <b>{jobDetail.companyName}</b></span>
                            <span className="card-title"><GoLocation /> {jobDetail.location}</span>
                        </div>
                        <div className="card-title postdate">
                            <BsCalendar2Date /> post date: {jobDetail.postingDate.substr(0, 10)}
                        </div>
                        <button 
                            className={liked ? "btn btn-danger likeButton" : "btn btn-outline-danger likeButton"}
                            onClick={addOrDeleteFav}>
                            {liked ? "unlike" : "like"}
                        </button>
                    </div>
                    <div className="DescriptionTitle"><b>Description: </b></div>
                    <div className="card-text DescriptionDisplay" 
                        dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(jobDetail.jobDescription))}} />
                    <div className="Employer">
                        <div><b>Employeer Info:</b></div>
                        <a href="mailto:m.bluth@example.com" className="card-title"><AiOutlineMail /> {jobDetail.employerEmail}</a>
                        {jobDetail.website ? 
                            <a href={jobDetail.website} className="card-title" target="_blank">
                                    <AiOutlineGlobal/> {jobDetail.website}
                            </a> 
                            :<></>}
                    </div>
                </div>
                { username === jobDetail.username && username ?
                    <div className="card-footer">
                        <Link to={`/editjob/${jobDetail._id}`}><button className="btn btn-secondary updateButton">Edit</button></Link>
                        <button className="btn btn-secondary" onClick={() => deleteJob()}>Delete</button>
                    </div>
                    : <></>
                }
            </div>
        </div>
        </div>
    )
}

import 'bootstrap/dist/css/bootstrap.min.css';
import { IoBusinessSharp } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import './JobPage.css';

export default function JobPage({ job }) {
    const { _id, title, companyName, location } = job;
    return (
        <div className="JobPage">
            <div className="card text-center">
                
                <div className="card-body">
                    <h5 className="card-title JobName">{title}</h5>
                    {/* <div class="card-text"><FaAddressCard /> {title}</div> */}
                    <div className="CompanyAndLocation">
                        <span className="card-title"><IoBusinessSharp /> <b>{companyName}</b></span>
                        <span className="card-title"><GoLocation /> {location}</span>
                    </div>
                    <Link to={`/jobDetail/${_id}`}><button className="btn DetailButton">See Detail</button></Link>
                </div>          
            </div>
        </div>
    )
}
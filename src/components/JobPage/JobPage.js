import 'bootstrap/dist/css/bootstrap.min.css';
import { IoBusinessSharp } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import './JobPage.css';

export default function JobPage({ job }) {
    const { id, name, title, company, location } = job;
    return (
        <div className="JobPage">
            <div class="card text-center">
                <div className="card-header test">{id}</div>
                <div class="card-body">
                    <h5 class="card-title JobName">{name}</h5>
                    {/* <div class="card-text"><FaAddressCard /> {title}</div> */}
                    <div class="CompanyAndLocation">
                        <span class="card-title"><IoBusinessSharp /> <b>{company}</b></span>
                        <span class="card-title"><GoLocation /> {location}</span>
                    </div>
                    <Link to="/detail"><button className="btn DetailButton">See Detail</button></Link>
                </div>          
            </div>
        </div>
    )
}
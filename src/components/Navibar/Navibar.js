import './Navibar.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from "react-icons/fa";

export default function Navibar() {
    let show = true;
    let username = "Wen";
    return (
        <div className="Navibar fixed-top">
            {show ?
                <div className="Buttons">
                    <Link to="/"><button>Home</button></Link>
                    <Link to="/find"><button>Favorites</button></Link>
                    <Link to="/signin"><button>Sign In</button></Link>
                    <Link to="/register"><button>Register</button></Link>
                    <Link to="/createjob"><button>Create Job</button></Link>
                    <button  className="UserNameButton"><FaUserCircle className="UserIcon"/> {username}</button>
                </div> : 
                <div className="Buttons">
                    <button>Home</button>
                    <button>Favorites</button>
                    <button>Sign Out</button>
                </div>   
            }                 
        </div>


    )
}
import './Navibar.css';
import { Link } from "react-router-dom";
import * as Cookies from "js-cookie";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from "react-icons/fa";

export default function Navibar() {
    let show = true;
    let username = Cookies.get("username");
    return (
        <div className="Navibar fixed-top">
                { !username ?
                <div className="Buttons">
                    <Link to="/"><button>Home</button></Link>
                    <Link to="/signin"><button>Sign In</button></Link>
                    <Link to="/register"><button>Register</button></Link>
                </div> 
                :
                <div className="Buttons">
                    <Link to="/"><button>Home</button></Link>
                    <button>Favorites</button>
                    <button>Sign Out</button>
                    <Link to="/createjob"><button>Create Job</button></Link>
                    <button  className="UserNameButton"><FaUserCircle className="UserIcon"/> {username}</button>
                </div>  
                }
        </div>
    )
}
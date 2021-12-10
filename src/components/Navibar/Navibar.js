import './Navibar.css';
import { Link } from "react-router-dom";
import * as Cookies from "js-cookie";
import axios from 'axios';
import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function Navibar() {
   // let show = true;
    const [username, setUserName] = useState(Cookies.get("username"));
    //let username = Cookies.get("username");

    const signOut = () => {
        axios.get('/users/logout')
        .then(response => {
            console.log(response.data);
            document.cookie = "username" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            setUserName(Cookies.get("username"));
            setTimeout(window.location.reload.bind(window.location), 250);
        })
        .catch(error => console.log(error));
    }

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
                    <button onClick={() => signOut()}>Sign Out</button>
                    <Link to="/createjob"><button>Create Job</button></Link>
                    <button  className="UserNameButton"><FaUserCircle className="UserIcon"/> {username}</button>
                </div>  
                }
        </div>
    )
}
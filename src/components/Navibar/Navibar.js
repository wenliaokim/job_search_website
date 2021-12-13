import './Navibar.css';
import { Link } from "react-router-dom";
import * as Cookies from "js-cookie";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

export default function Navibar() {
    const [username, setUserName] = useState(Cookies.get("username"));
    const [background, setBackground] = useState("none");
    const [showMobileNavBar, setShowMobileNaBar] = useState(false);
    
    useEffect(() => {
        window.addEventListener('scroll', Navibar)
        return () => window.removeEventListener('scroll', Navibar)
    }, []);

    const controllMobileButtion = () => setShowMobileNaBar(!showMobileNavBar);
    const closeMobileButtion = () => setShowMobileNaBar(false);
    const Navibar = () => {
        if (window.scrollY > 30) setBackground("white");
        else setBackground("none");
    }
    const signOut = () => {
        axios.get('/users/logout')
        .then(response => {
            console.log(response.data);
            document.cookie = "username" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            setUserName(Cookies.get("username"));
            setTimeout(window.location.reload.bind(window.location), 100);
        })
        .catch(error => console.log(error));
    }

    return (
        <div className="Navibar fixed-top" style={{background: background}}>
            <div className="MobileButton" onClick={() => controllMobileButtion()} style={{background: background}}>
                {showMobileNavBar ? <ImCross /> : <GiHamburgerMenu />}
            </div>
            { !username ?
            <div className={ showMobileNavBar ? "Buttons active" : "Buttons"}>
                <Link to="/"><button onClick={() => closeMobileButtion()}>Home</button></Link>
                <Link to="/signin"><button onClick={() => closeMobileButtion()}>Sign In</button></Link>
                <Link to="/register"><button onClick={() => closeMobileButtion()}>Register</button></Link>
            </div> 
            :
            <div className={ showMobileNavBar ? "Buttons active" : "Buttons"}>
                <Link to="/"><button onClick={() => closeMobileButtion()}>Home</button></Link>
                <Link to="/favoritesPage"><button onClick={() => closeMobileButtion()}>Favorites</button></Link>
                <button 
                    onClick={() => {
                        signOut();
                        closeMobileButtion();
                    }}>Sign Out
                </button>
                <Link to="/createjob"><button onClick={() => closeMobileButtion()}>Create Job</button></Link>
                <button className="UserNameButton" onClick={() => closeMobileButtion()}><FaUserCircle className="UserIcon"/> 
                    {username}
                </button>
            </div>  
            }
        </div>
    )
}
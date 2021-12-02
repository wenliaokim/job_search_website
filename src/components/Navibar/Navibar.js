import './Navibar.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navibar() {
    let show = true;

    return (
        <div className="Navibar fixed-top">
            {show ?
                <div className="Buttons">
                    <Link to="/"><button>Home</button></Link>
                    <button>Favorites</button>
                    <Link to="/signin"><button>Sign In</button></Link>
                    <Link to="/register"><button>Register</button></Link>
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
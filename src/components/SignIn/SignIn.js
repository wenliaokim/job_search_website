import { Link } from "react-router-dom";
import './SignIn.css';


export default function SignIn() {

    return (
        <div className='Background'>
            <div className="signInBackground">
                <h1 className='logintitle'>Please Login</h1>
                <div className="control">
                    <input type="text" placeholder='Username'/>
                </div>
                <div className="control">
                    <input type="password" placeholder='Password'/>
                </div>
                <button className="logininbutton">Login</button>
                <div className='textForRegister'>Don't have an account?</div>
                <Link to="/register"><button className='register'>Register</button></ Link>
            </div>
        </div>
      )
}
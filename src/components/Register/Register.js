import { Link } from "react-router-dom";

export default function Register() {

    return (
        <div className='Background'>
            <div className="signInBackground">
                <h1 className='logintitle'>Please Register</h1>
                <div className="control">
                    <input type="text" placeholder='Username'/>
                </div>
                <div className="control">
                    <input type="password" placeholder='Password'/>
                </div>
                <div className="control">
                    <input type="password" placeholder='Password Again'/>
                </div>
                <button className="logininbutton">Register</button>
                <div className='textForRegister'>Already Have an account?</div>
                <Link to="/signin"><button className='register'>Login</button></ Link>
            </div>
        </div>
      )
}
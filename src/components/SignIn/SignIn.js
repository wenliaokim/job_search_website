import { Link, Redirect,  } from "react-router-dom";
// import { useNavigate } from "react-router";
import { useState } from 'react';
import axios from 'axios';
import * as Cookies from "js-cookie";
import './SignIn.css';


export default function SignIn() {
    const [userInput, setUserInput] = useState({
        username:'', password:''
    })
    const onUsernameChange = (e) => {setUserInput({...userInput, username: e.target.value})};
    const onPasswordChange = (e) => {setUserInput({...userInput, password: e.target.value})};

    // const navigate = useNavigate();
    const onSubmit = () => {
        axios.post('/users/login', userInput)
        .then(response => {
            console.log(response.data);
            Cookies.set("username", response.data.username);
        })
        // .then (() => navigate('/'))
        .catch(error => console.log(error));
    }

    return (
        <div className='Background'>
            <div className="signInBackground">
                <h1 className='logintitle'>Please Login</h1>
                <div className="control">
                    <input type="text" placeholder='Username' onChange={onUsernameChange}/>
                </div>
                <div className="control">
                    <input type="password" placeholder='Password' onChange={onPasswordChange}/>
                </div>
                <button className="logininbutton" onClick={()=> onSubmit()}>Login</button>
                <div className='textForRegister'>Don't have an account?</div>
                <Link to="/register"><button className='register'>Register</button></ Link>
            </div>
        </div>
      )
}
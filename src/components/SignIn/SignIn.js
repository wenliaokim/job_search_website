import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import * as Cookies from "js-cookie";
import './SignIn.css';
import { API_URL } from "../../constant";

export default function SignIn() {
    const [userInput, setUserInput] = useState({username:'', password:''});
    const onUsernameChange = (e) => {setUserInput({...userInput, username: e.target.value})};
    const onPasswordChange = (e) => {setUserInput({...userInput, password: e.target.value})};

    const history = useHistory();

    const onSubmit = () => {
        axios.post(API_URL + '/users/login', userInput)
        .then(response => {
            Cookies.set("username", response.data.username);
            history.goBack();
            setTimeout(window.location.reload.bind(window.location), 100);
        })
        .catch(error => {
            console.log(error)
            window.alert("wrong username/password");
        });
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
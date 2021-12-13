import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../constant";

export default function Register() {
    const [userInfo, setUserInfo] = useState({
        username: '', password: ''
    });
    const [passwordRepetition, setPasswordRepetition] = useState('');

    const onUsernameChange = (e) => {setUserInfo({...userInfo, username: e.target.value})};
    const onPasswordChange = (e) => {setUserInfo({...userInfo, password: e.target.value})};
    const onPasswordReChange = (e) => {setPasswordRepetition(e.target.value)};

    const history = useHistory();

    const onSubmit = () => {
        if (userInfo.password === "") 
            window.alert("cannot input empty password");
        else if (passwordRepetition !== userInfo.password) 
            window.alert("not input same password");
        else {
            axios.post(API_URL + '/users/createUser', userInfo)
            .then(() => {history.goBack()})
            .catch(error => {
                console.log(error);
                window.alert("username already be used");
            });
        }
    }

    return (
        <div className='Background'>
            <div className="signInBackground">
                <h1 className='logintitle'>Please Register</h1>
                <div className="control">
                    <input type="text" placeholder='Username' onChange={onUsernameChange}/>
                </div>
                <div className="control">
                    <input type="password" placeholder='Password' onChange={onPasswordChange}/>
                </div>
                <div className="control">
                    <input type="password" placeholder='Password Again' onChange={onPasswordReChange}/>
                </div>
                <button className="logininbutton" onClick={() => onSubmit()}>Register</button>
                <div className='textForRegister'>Already Have an account?</div>
                <Link to="/signin"><button className='register'>Login</button></ Link>
            </div>
        </div>
      )
}
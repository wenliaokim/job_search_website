import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';


export default function Register() {
    const [userInfo, setUserInfo] = useState({
        username: '', password: ''
    });
    const [passwordRepetition, setPasswordRepetition] = useState('');

    const onUsernameChange = (e) => {setUserInfo({...userInfo, username: e.target.value})};
    const onPasswordChange = (e) => {setUserInfo({...userInfo, password: e.target.value})};
    const onPasswordReChange = (e) => {setPasswordRepetition(e.target.value)};

    const onSubmit = () => {
        if (passwordRepetition !== userInfo.password) {
            console.log("not input same password")
        } else {
            axios.post('/users/createUser', userInfo)
            .then(response => console.log(response))
            .catch(error => console.log(error));
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
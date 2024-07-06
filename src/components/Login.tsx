import { useNavigate } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { storeToken } from '../utils/authentication';
import steamLogin from '../assets/images/steam_small.png';

function LoginForm(props : {error: string}) {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string>('');

    useEffect(() => {
        console.log(props.error);
        if(props.error && props.error != '') {
            switch (props.error) {
                case "authenication_error":
                    setError("There was an error authenicating your, please login again,");
                    break;
                case "unverified":
                    setError("Your account is not verified, please check your email for a verification link.");
                    break;
                default:
                    break;
            }
        }
    }, [props.error]);
        const navigate = useNavigate();
    function doSignIn(e: React.FormEvent): void {
        e.preventDefault()
        const url = `${import.meta.env.VITE_CLOUD_API_URL}Authentication/AuthenticateSLGUser?username=${loginData.username}&password=${loginData.password}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    setError('There was an error with your login. Please try again later.')
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Store the response data in a variable
                storeToken(data.token)
                window.location.href = '/account';
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }



    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    return (
        <div className='login-wrap d-flex flex-column align-items-center w-25'>
            <h1>Eco Login</h1>
            <p>Log in to access your account</p>
            {error && <p className="alert alert-info">{error}</p>}
            <form className="w-100" onSubmit={doSignIn}>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="text" name="username" id="username" title="username" placeholder="Username" />
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="password" name="password" id="password" title="password" placeholder="Password" />
                </div>
                <button className="btn login-button w-100" type="submit">Login</button>
            </form>
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                <a className="btn steam-login w-100" href={`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/RegisterWithSteam`}>Login with Steam</a>
                <a className="login-forgot" href="/forgot">Forgot Password</a>
                <a className="login-forgot" href="/register">Register an Account</a>                
            </div>
        </div>
    );
}
export default LoginForm
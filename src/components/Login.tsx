import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import {storeToken} from '../utils/authentication';
function LoginForm() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    function doSignIn(e: React.FormEvent): void {
        e.preventDefault()
        const url = `https://cloud.strangeloopgames.com/Authentication/AuthenticateSLGUser?username=${loginData.username}&password=${loginData.password}`;
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
                navigate({
                    to: '/account',
                })
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
        <div className='login-wrap d-flex flex-column align-items-center'>
            <h1>Eco Login</h1>
            <p>Log in to access your account</p>
            {error && <p className="alert alert-info">{error}</p>}
            <form onSubmit={doSignIn}>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="text" name="username" id="username" title="username" placeholder="Username" />
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="password" name="password" id="password" title="password" placeholder="Password" />
                </div>
                <button className="btn login-button w-100" type="submit">Login</button>
            </form>
        </div>
    );
}
export default LoginForm
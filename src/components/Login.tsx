import { getRouteApi, Link, redirect, Route, useNavigate } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { storeToken } from '../utils/authentication';
import { Modal } from 'react-bootstrap';

function LoginForm(props : {error: string, redirect: string}) {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    useEffect(() => {
        if(props.error && props.error != '') {
            switch (props.error) {
                case "authenication_error":
                    setError("There was an error authenicating your, please login again,");
                    break;
                case "unverified":
                    setError("Your account is not verified, please check your email for a verification link.");
                    break;
                case "purchase_login":
                    setError("You must be logged in to make a purchase.");
                    break;
                default:
                    break;
            }
        }
    }, [props.error]);
        const navigate = useNavigate();
    function doSignIn(e: React.FormEvent): void {
        e.preventDefault()
        const url = `${import.meta.env.VITE_CLOUD_API_URL}Authentication/AuthenticateSLGUser`;
        setIsLoading(true);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (!response.ok) {
                    if(response.status != 200) {
                        return response.json().then(errorData => {
                            if (response.status === 401) {
                                setError(errorData.status);
                            }
                            if(response.status == 500) {
                                setError(errorData.message);
                            }
                        });
                    } else {
                        setError('There was an error with your login. Please try again later.')
                    }
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Store the response data in a variable
                storeToken(data.token)
                if(props.redirect != null) {
                    location.href = props.redirect ;
                } else {
                    location.href = "/account";
                }
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
            setIsLoading(false);
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
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-2 login-footer">
                <a className="btn steam-login w-100" href={`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/RegisterWithSteam`}>Login with Steam</a>
                <Link to="/forgot" className="login-forgot">Forgot Password</Link>
                <Link to="/register" className="login-forgot">Register an Account</Link>             
            </div>
            {
            isLoading ? (
                <Modal type={"Loading"} message={"Logging you in"} data={undefined} />
            ) : null
        }
        </div>
    );
}
export default LoginForm
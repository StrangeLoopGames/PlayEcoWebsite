import { getRouteApi, Link, redirect, Route, useNavigate } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { storeToken } from '../utils/authentication';
import { Modal } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';

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

    const loginMutate = useMutation({
        mutationFn: async (loginData: { username: string; password: string }) => {
            setIsLoading(true);
            const url = `${import.meta.env.VITE_CLOUD_API_URL}Authentication/AuthenticateSLGUser`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                    throw new Error(errorData.status);
                }
                if (response.status === 500) {
                    throw new Error(errorData.message);
                }
                throw new Error('There was an error with your login. Please try again later.');
            }
            return response.json();
        },
        onSuccess: (data) => {
            storeToken(data.token);
            if (props.redirect) {
                location.href = props.redirect;
            } else {
                location.href = "/account";
            }
        },
        onError: (error: any) => {
            setError(error.message);
        },
        onSettled: () => {
            setIsLoading(false);
        }
    });

    function doSignIn(e: React.FormEvent): void {
        e.preventDefault();
        setIsLoading(true);
        loginMutate.mutate(loginData);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    return (
        <div className='login-wrap d-flex flex-column align-items-center w-25 position-relative'>
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
                <button className="btn login-button w-100" type="submit">{loginMutate.isPending ? "Logging In" : "Login"}</button>
            </form>
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-2 login-footer">
                <span className='fw-bolder'>OR</span> 
                <hr className="w-100 position-absolute" />
                <a className="btn steam-login w-100" href={`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/RegisterWithSteam`}>Login with Steam</a>
                <span className='w-100 text-center'>Use this option if you bought the game on steam but don't yet have a play.eco account</span> 
                <Link to="/forgot" className="login-forgot">Forgot Password</Link>
                <Link to="/register" className="login-forgot">Register an Account</Link>             
            </div>
            {
                loginMutate.isPending || isLoading ? (
                    <Modal type={"Loading"} message={"Logging you in"} data={undefined} />
                ) : null
            }
        </div>
    );
}

export default LoginForm;
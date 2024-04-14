import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { storeToken } from '../utils/authentication';
type Register = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    ageConfirm: boolean;
    newsletter: boolean;
}
function LoginForm() {
    const [registerData, setRegisterData] = useState<Register>({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        ageConfirm: false,
        newsletter: false
    });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    function doRegistration(e: React.FormEvent): void  {
        e.preventDefault()
        const queryString: string = `username=${registerData.username}&email=${registerData.email}&password=${registerData.password}&passwordConfirm=${registerData.passwordConfirm}&ageConfirm=${registerData.ageConfirm}&newsletter=${registerData.newsletter}`
        const url = `https://cloud.strangeloopgames.com/api/Registration/RegisterUser?${queryString}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    setError('There was an error with your registration. Please try again later.')
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Store the response data in a variable
                console.log(data);

                storeToken(data.token)
                navigate({
                    to: '/account',
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    }
    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target;
        setRegisterData({ ...registerData, [name]: checked ? true : false});
    }

    return (
        <div className='login-wrap d-flex flex-column align-items-center'>
            <h1>Eco Login</h1>
            <p>Log in to access your account</p>
            {error && <p className="alert alert-info">{error}</p>}
            <form onSubmit={doRegistration}>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="text" name="username" id="username" title="username" placeholder="Username" />
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="text" name="email" id="email" title="email" placeholder="Email" />
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="password" name="password" id="password" title="password" placeholder="Password" />
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="password" name="passwordConfirm" id="passwordConfirm" title="passwordConfirm" placeholder="Confirm Password" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="ageConfirm">
                        <input onChange={handleCheckboxChange} type="checkbox" name="ageConfirm" id="ageConfirm" />
                        I am over the age of 13 years old
                    </label>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="newsletter">
                        <input onChange={handleCheckboxChange} type="checkbox" name="newsletter" id="newsletter" />
                        Join the Eco Newsletter
                    </label>
                </div>
                <button className="btn login-button w-100" type="submit">Register</button>
            </form>
        </div>
    );
}
export default LoginForm
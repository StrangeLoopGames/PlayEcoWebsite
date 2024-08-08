import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { isValidPassword, isValidUsername } from '../utils/authentication';
import { Modal } from './Modal';
type Register = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    ageConfirm: boolean;
    newsletter: boolean;
}
type registerMutate = {
    username: string;
    email: string;
    password: string;

}
function _turnstileCb() {
    console.debug('_turnstileCb called');

    turnstile.render('#turnstile-widget', {
        sitekey: '0xAAAAAAAAAXAAAAAAAAAAAA',
        theme: 'light',
    });
}
function RegisterForm() {
    const [registerData, setRegisterData] = useState<Register>({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        ageConfirm: false,
        newsletter: false
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const registerMutate = useMutation({
        mutationFn: async (register: registerMutate) => {
            const response = await fetch(`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/RegisterUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(register),
            })

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(JSON.stringify(errorResponse));
            }

            const data = await response.json();
            return data.token;
        },
        onSuccess: () => {
            navigate({
                to: '/account',
                search: {
                    token: null,
                    refType: null
                }
            });
        },
        onError: (error: any, response) => {
            console.log(response);
            setError(`There was an error registering your account. ${JSON.parse(error.message).message}`);
        }
    });

    function doRegistration(e: React.FormEvent): void {
        e.preventDefault();
        if (registerData.password != registerData.passwordConfirm) {
            setError('Passwords do not match');
            return;
        } else if (!isValidPassword(registerData.password)) {
            setError('Password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character (e.g., !@#$%^&*).');
            return;
        } else {
            registerMutate.mutate({
                username: registerData.username,
                email: registerData.email,
                password: registerData.password
            });
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setError(null);
        // Validate username if it's being updated
        if (name === "username" && !isValidUsername(value)) {
            setError('Username is not valid, please use only letters, numbers, and underscores.');
        }
        if (name === "email" && !value.includes('@')) {
            setError('Email is not valid');
        }
        if (name === "password" && !isValidPassword(value)) {
            setError('Password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character (e.g., !@#$%^&*).');
        }
        if (name === "passwordConfirm" && value !== registerData.password) {
            setError('Passwords do not match.');
        }
        setRegisterData({ ...registerData, [name]: value });
    }
    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target;
        setRegisterData({ ...registerData, [name]: checked ? true : false });
    }

    return (
        <div className='login-wrap d-flex flex-column align-items-center'>
            <h1>Eco Login</h1>
            <p>Register an Eco account</p>
            {error && <p className="alert alert-info">{error}</p>}
            <form onSubmit={doRegistration}>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="text" name="username" id="username" title="username" placeholder="Username" value={registerData.username} />
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
                        <span className='px-2'>I am over the age of 13 years old</span>
                    </label>
                </div>
                <div id="turnstile-widget"></div>
                <button className={`btn login-button w-100 ${error != null ? "disabled" : ""}`} type="submit">Register</button>
            </form>
            {
                registerMutate.isPending ? (
                    <Modal type={"Loading"} message={"Creating account"} data={undefined} />
                ) : null
            }
        </div>
    );
}
export default RegisterForm;
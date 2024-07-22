import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { isValidPassword } from '../utils/authentication';
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
function RegisterForm() {  
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

    const registerMutate = useMutation({
        mutationFn: (register: registerMutate) => {
            return fetch(`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/RegisterUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(register),
            });
        }
    });
    
    function doRegistration(e: React.FormEvent): void {
        e.preventDefault();
        if (registerData.password != registerData.passwordConfirm) {
            setError('Passwords do not match');
            return;
        } else if(!isValidPassword(registerData.password)) {
            setError('Password is not valid, please use at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        } else {
            registerMutate.mutate({
                username: registerData.username,
                email: registerData.email,
                password: registerData.password
            });
            if (registerMutate.isSuccess) {
                navigate({
                    to: '/account',
                });
            }
            if (registerMutate.isError || error) {
                console.log(registerMutate.error);
                setError("There was an error registering your account.");
            }
        }
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
                <button className="btn login-button w-100" type="submit">Register</button>
            </form>
        </div>
    );
}
export default RegisterForm;
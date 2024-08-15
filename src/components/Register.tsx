import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { isValidPassword, isValidUsername } from '../utils/authentication';
import { Modal } from './Modal';
import { debounce } from '../utils/stringUtils';

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
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const navigate = useNavigate();

    const registerMutate = useMutation({
        mutationFn: async (register: registerMutate) => {
            const response = await fetch(`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/RegisterUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(register),
            });

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
            setErrors({ form: `There was an error registering your account. ${JSON.parse(error.message).message}` });
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setRegisterData({ ...registerData, [name]: checked });
    };

    const doRegistration = (e: React.FormEvent): void => {
        e.preventDefault();
        const newErrors: { [key: string]: string | null } = {};
    
        if (!registerData.username) {
            newErrors.username = 'Username is required';
        } else if (!isValidUsername(registerData.username)) {
            newErrors.username = 'Username is not valid, please use only letters, numbers, and underscores.';
        }
    
        if (!registerData.email) {
            newErrors.email = 'Email is required';
        } else if (!registerData.email.includes('@')) {
            newErrors.email = 'Email is not valid';
        }
    
        if (!registerData.password) {
            newErrors.password = 'Password is required';
        } else if (!isValidPassword(registerData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character (e.g., !@#$%^&*).';
        }
    
        if (!registerData.passwordConfirm) {
            newErrors.passwordConfirm = 'Password confirmation is required';
        } else if (registerData.password !== registerData.passwordConfirm) {
            newErrors.passwordConfirm = 'Passwords do not match';
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            registerMutate.mutate({
                username: registerData.username,
                email: registerData.email,
                password: registerData.password
            });
        }
    };

    return (
        <div className='login-wrap d-flex flex-column align-items-center'>
            <h1>Eco Login</h1>
            <p>Register an Eco account</p>
            {errors.form && <p className="alert alert-info">{errors.form}</p>}
            <form onSubmit={doRegistration}>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className={`w-100 form-control ${errors.username ? 'field-error' : ''}`} type="text" name="username" id="username" title="username" placeholder="Username" />
                    {errors.username && <p className="field-error-message">{errors.username}</p>}
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className={`w-100 form-control ${errors.email ? 'field-error' : ''}`} type="text" name="email" id="email" title="email" placeholder="Email" />
                    {errors.email && <p className="field-error-message">{errors.email}</p>}
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className={`w-100 form-control ${errors.password ? 'field-error' : ''}`} type="password" name="password" id="password" title="password" placeholder="Password" />
                    {errors.password && <p className="field-error-message">{errors.password}</p>}
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className={`w-100 form-control ${errors.passwordConfirm ? 'field-error' : ''}`} type="password" name="passwordConfirm" id="passwordConfirm" title="passwordConfirm" placeholder="Confirm Password" />
                    {errors.passwordConfirm && <p className="field-error-message">{errors.passwordConfirm}</p>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="ageConfirm">
                        <input onChange={handleCheckboxChange} type="checkbox" name="ageConfirm" id="ageConfirm" />
                        <span className='px-2'>I am over the age of 13 years old</span>
                    </label>
                </div>
                <div id="turnstile-widget"></div>
                <button className={`btn login-button w-100 ${Object.keys(errors).length > 0 ? "disabled" : ""}`} type="submit">{registerMutate.isPending ? "Registering" : "Register"}</button>
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
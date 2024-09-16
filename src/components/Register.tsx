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
};

type registerMutate = {
    username: string;
    email: string;
    password: string;
};

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
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
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
            setSubmitError(`There was an error registering your account. ${JSON.parse(error.message).message}`);
        }
    });

    const handleInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        // clear errors to clear any old error messages
        setErrors({});
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: null });

        if (name === "username" && !isValidUsername(value)) {
            setErrors({ ...errors, username: 'Username is not valid, please use only letters, numbers, and underscores.' });
        }
        if (name === "email" && !value.includes('@')) {
            setErrors({ ...errors, email: 'Email is not valid' });
        }
        if (name === "password" && !isValidPassword(value)) {
            setErrors({ ...errors, password: 'Password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character (e.g., !@#$%^&*).' });
        }
        if (name === "passwordConfirm" && value !== registerData.password) {
            setErrors({ ...errors, passwordConfirm: 'Passwords do not match.' });
        }

        setRegisterData({ ...registerData, [name]: value });
    }, 500);

    function doRegistration(e: React.FormEvent): void {
        e.preventDefault();
        if (registerData.password !== registerData.passwordConfirm) {
            setErrors({ ...errors, passwordConfirm: 'Passwords do not match' });
            return;
        } else if (!isValidPassword(registerData.password)) {
            setErrors({ ...errors, password: 'Password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character (e.g., !@#$%^&*).' });
            return;
        } else {
            registerMutate.mutate({
                username: registerData.username,
                email: registerData.email,
                password: registerData.password
            });
        }
    }

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target;
        setRegisterData({ ...registerData, [name]: checked ? true : false });
    }

    return (
        <div className='login-wrap d-flex flex-column align-items-center'>
            <h1>Eco Login</h1>
            <p>Register an Eco account</p>
            {submitError && <p className="alert alert-info w-75">{submitError}</p>}
            <form onSubmit={doRegistration}>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className={`w-100 form-control ${errors.username ? 'field-error' : ''}` } type="text" name="username" id="username" title="username" placeholder="Username" />
                    {errors.username && <p className="text-danger fw-bold px-2 fs-6">{errors.username}</p>}
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className={`w-100 form-control ${errors.email ? 'field-error' : ''}` } type="text" name="email" id="email" title="email" placeholder="Email" />
                    {errors.email && <p className="text-danger fw-bold px-2 fs-6">{errors.email}</p>}
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className={`w-100 form-control ${errors.password ? 'field-error' : ''}` } type="password" name="password" id="password" title="password" placeholder="Password" />
                    {errors.password && <p className="text-danger fw-bold px-2 fs-6">{errors.password}</p>}
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className={`w-100 form-control ${errors.passwordConfirm ? 'field-error' : ''}` } type="password" name="passwordConfirm" id="passwordConfirm" title="passwordConfirm" placeholder="Confirm Password" />
                    {errors.passwordConfirm && <p className="text-danger fw-bold px-2 fs-6">{errors.passwordConfirm}</p>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="ageConfirm">
                        <input onChange={handleCheckboxChange} type="checkbox" name="ageConfirm" id="ageConfirm" />
                        <span className='px-2'>I am over the age of 13 years old</span>
                    </label>
                </div>
                <div id="turnstile-widget"></div>
                <button className={`btn login-button w-100 ${Object.values(errors).some(error => error) ? "disabled" : ""}`} type="submit">Register</button>
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
import { useNavigate } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { AuthenticatedUser, useUserQuery, isValidUsername, checkNewSteamUserStatus, isValidPassword } from '../utils/authentication';
import { Modal } from './Modal';
import { useMutation } from '@tanstack/react-query';
type RegisterSteam = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
type RegisterMutate = {
    username: string;
    email: string;
    password: string;
}
function SteamRegister() {
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const navigate = useNavigate();
    const userJwt = AuthenticatedUser();
    if (userJwt === false) {
        location.href = '/login';
    }
    const [registerData, setRegisterData] = useState<RegisterSteam>({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [showRegister, setShowRegister] = useState(true);
    const { data: user, error: userError, isLoading: userLoading } = useUserQuery(userJwt as string);
    // handle the submission of the form via mutation
    
    const registerMutate = useMutation({
        mutationFn: async (register: RegisterMutate) => {
            const response = await fetch(`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/SetUsernameAndPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userJwt}`,
                },
                body: JSON.stringify(register),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(JSON.stringify(errorResponse));
            } else {
                location.href = "/account";
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
    const doSteamRegister = (e: React.FormEvent): void => {
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
    useEffect(() => {
        if (user != null && user != undefined && !userError) {
            setRegisterData({ ...registerData, username: user.username, email: user.email});
        }
    }, [setRegisterData, user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    }
    if (user && !checkNewSteamUserStatus(user)) {
        setShowRegister(false);
        location.href = "/account";
    }
    return (
        <>
        {
            showRegister ? (
                <div className='login-wrap d-flex flex-column align-items-center w-25'>
                <h1>Register</h1>
                <p>You successfully registered with steam</p>
                <p className="alert alert-success">Complete your account below, this will allow you to login via steam or these credentials</p>
                {errors.form && <p className="alert alert-info">{errors.form}</p>}
                <form onSubmit={doSteamRegister}>
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
                        <div id="turnstile-widget"></div>
                        <button className={`btn login-button w-100 ${Object.keys(errors).length > 0 ? "disabled" : ""}`} type="submit">{registerMutate.isPending ? "Registering" : "Register"}</button>
                    </form>
            </div>
            ) : null
        }
        </>
    );
}
export default SteamRegister;
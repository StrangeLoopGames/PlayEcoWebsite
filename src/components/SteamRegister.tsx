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
function SteamRegister() {
    const [error, setError] = useState<string | null>(null);
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
        mutationFn: async (url: string) => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userJwt}`,
                },
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
    function doSteamRegister(e: React.FormEvent): void {
        e.preventDefault();
        if (registerData.password != registerData.passwordConfirm) {
            setError('Passwords do not match');
            return;
        } else {
            const queryString: string = `username=${registerData.username}&email=${registerData.email}&password=${registerData.password}`
            
            if(error == "") {
            registerMutate.mutate(`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/SetUsernameAndPassword?${queryString}`);
            if (registerMutate.isSuccess) {
                window.location.href = '/account';
            }
            if (registerMutate.isError || userError) {
                setError("There was an error registering your account.");
            }
            }
        }
    }
    useEffect(() => {
        if (user != null && user != undefined && !userError) {
            setRegisterData({ ...registerData, username: user.username, email: user.email});
        }
    }, [setRegisterData, user]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setError(null);
        // Validate username if it's being updated
        if (name === "username" && !isValidUsername(value)) {
            setError('Username is not valid, please use only letters, numbers, and underscores.');
        }
        if(name === "email" && !value.includes('@')) {
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
                {error && <p className="alert alert-info">{error}</p>}
                <form onSubmit={doSteamRegister} className='w-100'>
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
                    <button className="btn login-button w-100" type="submit" disabled={error !== null}>Register</button>
                </form>
            </div>
            ) : null
        }
            {
                registerMutate.isPending ? (
                    <Modal type={"Loading"} message={"Creating account"} data={undefined} />
                ) : null
            }
        </>
    );
}
export default SteamRegister;
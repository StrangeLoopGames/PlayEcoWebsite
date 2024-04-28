import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { AuthenticatedUser, useUserQuery, isValidUsername, checkNewSteamUserStatus } from '../utils/authentication';
import { Modal } from './Modal';
import { useMutation } from '@tanstack/react-query';
type RegisterSteam = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
function SteamRegister() {
    const [error, setError] = useState<string>('');
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
    const { data: user, error: userError, isLoading: userLoading } = useUserQuery(userJwt as string);

    // handle the submission of the form via mutation
    const registerMutate = useMutation({
        mutationFn: (url: string) => {
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userJwt}`,
                },
            });
        }
    });
    // If the user is not new, redirect them to the account page
    if (user && !checkNewSteamUserStatus(user)) {
        navigate({
            to: '/account',
        });
    }
    function doSteamRegister(e: React.FormEvent): void {
        e.preventDefault();
        if (registerData.password != registerData.passwordConfirm) {
            setError('Passwords do not match');
            return;
        } else {
            const queryString: string = `username=${registerData.username}&email=${registerData.email}&password=${registerData.password}`
            registerMutate.mutate(`https://cloud.strangeloopgames.com/api/Registration/SetUsernameAndPassword?${queryString}`);
            console.log(registerMutate);
            if (registerMutate.isSuccess) {
                navigate({
                    to: '/account',
                });
            }
            if (registerMutate.isError || userError) {
                console.log(registerMutate.error);
                setError("There was an error registering your account.");
            }
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        // Validate username if it's being updated
        if (name === "username" && !isValidUsername(value)) {
            setError('Username is not valid, please use only letters, numbers, and underscores.');
        } else {
            setError('');
        }
        // Update the register data in any case
        setRegisterData({ ...registerData, [name]: value });
    }

    return (
        <>
            <div className='login-wrap d-flex flex-column align-items-center'>
                <h1>Eco Login</h1>
                <p>Register with Steam</p>
                {error && <p className="alert alert-info">{error}</p>}
                <form onSubmit={doSteamRegister}>
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
                    <button className="btn login-button w-100" type="submit">Register</button>
                </form>
            </div>
            {
                userLoading || registerMutate.isPending ? (
                    <Modal type="Loading" message="Please wait while we load your account information." />
                ) : null

            }
            {
                Object.entries(registerData).map(([key, value]) => {
                    return (
                        <p key={key}>{key}: {value}</p>
                    );
                })
            }
        </>
    );
}
export default SteamRegister;
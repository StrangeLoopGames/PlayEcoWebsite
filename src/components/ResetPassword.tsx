import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isValidPassword } from "../utils/authentication";

export function ResetPassword ({token}: {token: string}) {

    const [error, setError] = useState("");
    const [resetToken , setResetToken] = useState("");
    const [resetData, setResetData] = useState(
        {
            password: "",
            passwordConfirm: "",
        }
    );
    
    document.title = 'Eco - Password Reset';
    
    const resetMutate = useMutation({
        mutationFn: (password: string) => {
            const url = `${import.meta.env.VITE_CLOUD_API_URL}PasswordReset/ResetPassword`;
            return fetch(url, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: resetToken,
                    password: password,
                })
            });
        },
        onSuccess: () => {
            window.location.href = '/account';
        },
        onError: (error: any, response) => {
            console.log(response);
            setError("There was an error registering your account.");
        }
    });
    useEffect(() => {
        if (token) {
            setResetToken(token); 
            window.history.pushState({}, document.title, window.location.pathname);
        } else {
            location.href = '/forgot?errid=invalid_token';
        }
    }, [token]);
    
    function doResetPassword(e: React.FormEvent): void {
        e.preventDefault();
        
        if (resetData.password != resetData.passwordConfirm) {
            setError('Passwords do not match');
            return;
        } else if(!isValidPassword(resetData.password)) {
            setError('Password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character (e.g., !@#$%^&*).');
            return;
        } else {
            if(error == "") {
            resetMutate.mutate(resetData.password);
            if (resetMutate.isSuccess) {
                window.location.href = '/account';
            }
            if (resetMutate.isError) {
                setError("There was an error registering your account.");
            }
            }
        }
    }
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setError('');
        // Validate username if it's being updated
        if (name === "password" && !isValidPassword(value)) {
            setError('Password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character (e.g., !@#$%^&*).');
        }
        if (name === "passwordConfirm" && value !== resetData.password) {
            setError('Passwords do not match.');
        }
        setResetData({ ...resetData, [name]: value });
    }
    return (
        <div className='login-wrap d-flex flex-column align-items-center w-25'>
            <h1>Reset Password</h1>
            <p className="w-100 text-center">Please enter your new password</p>
            {error && <p className="alert alert-info w-100 text-center">{error}</p>}
            <form onSubmit={doResetPassword} className='w-100'>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="password" name="password" id="password" title="password" placeholder="Password" />
                </div>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} className="w-100 form-control" type="password" name="passwordConfirm" id="passwordConfirm" title="passwordConfirm" placeholder="Confirm Password" />
                </div>
                <button className="btn login-button w-100" type="submit">Change Password</button>
            </form>
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                <a className="login-forgot" href="/forgot">Existing user login</a>
                <a className="login-forgot" href="/register">Register an Account</a>                
            </div>
        </div>
    )
}
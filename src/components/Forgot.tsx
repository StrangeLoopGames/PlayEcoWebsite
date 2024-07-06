import React, { useEffect, useState } from 'react';
function ForgotForm() {
    const [submitData, setSubmitData] = useState({
        email: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [forgotSubmit, setForgotSubmit] = useState<boolean>(false);
    function doForgotSubmit(e: React.FormEvent): void {
        e.preventDefault()
        const url = `${import.meta.env.VITE_CLOUD_API_URL}PasswordReset/RequestReset?email=${submitData.email}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    setError('There was an error with your request. Please contact support.')
                    throw new Error('Network response was not ok');
                }
                setForgotSubmit(true);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }
    useEffect(() => {
        // get errid from the url
        const urlParams = new URLSearchParams(window.location.search);
        const errid = urlParams.get('errid');
        if (errid === 'invalid_token') {
            setError('There was an error with your request. Please try again.');
        }   
    }   , []);


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setSubmitData({ ...submitData, [name]: value });
    }
    return (
        <div className='login-wrap d-flex flex-column align-items-center w-25'>
            <h1>Forgot Password</h1>
            <p>Request a password reset</p>
            {error && <p className="alert alert-info">{error}</p>}
            {forgotSubmit && error == null ? (
                <p className="alert alert-success">An email has been sent to the address provided with instructions on how to reset your password.</p>
                ): (
                    <form className="w-100" onSubmit={doForgotSubmit}>
                    <div className="form-group mb-3">
                        <input onChange={handleInputChange} value={submitData.email} className="w-100 form-control" type="text" name="email" id="email" title="email" placeholder="Email" />
                    </div>
                    <button className="btn login-button w-100" type="submit">Submit</button>
                </form>
                )
            }
        </div>
    );
}
export default ForgotForm
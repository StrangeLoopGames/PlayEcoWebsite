import React, { useState } from 'react';
function ForgotForm() {
    const [submitData, setSubmitData] = useState({
        email: "",
    });
    const [error, setError] = useState<string>('');
    const [alert, setAlert] = useState<string>('');
    function doSignIn(e: React.FormEvent): void {
        e.preventDefault()
        const url = `https://cloud.strangeloopgames.com/PasswordReset/RequestReset?email=${submitData.email}`;
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
                return response.text();
            })
            .then(text => {
                setAlert(text); // assuming setAlert is a function that takes a string parameter
                setSubmitData ({email: ""});
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }



    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setSubmitData({ ...submitData, [name]: value });
    }
    return (
        <div className='login-wrap d-flex flex-column align-items-center w-25'>
            <h1>Forgot Password</h1>
            <p>Request a password reset</p>
            {error && <p className="alert alert-info">{error}</p>}
            {alert && <p className="alert alert-info">{alert}</p>}
            <form className="w-100" onSubmit={doSignIn}>
                <div className="form-group mb-3">
                    <input onChange={handleInputChange} value={submitData.email} className="w-100 form-control" type="text" name="email" id="email" title="email" placeholder="Email" />
                </div>
                <button className="btn login-button w-100" type="submit">Submit</button>
            </form>
        </div>
    );
}
export default ForgotForm
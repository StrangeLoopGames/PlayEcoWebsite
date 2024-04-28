import { useState } from 'react';
function UserCard(props: any) {
    const [error, setError] = useState<{type: string | null, message: string | null}>({ type: null, message: null });
    const [userEdit, setUserEdit] = useState({ edit: false, user: props.user });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserEdit({ edit: userEdit.edit, user: { ...userEdit.user, [name]: value } });
        if(userEdit.user.password != userEdit.user.passwordConfirm) {
            setError({type: "password", message: "Passwords do not match"});
        } else {
            setError({type: null, message: null});
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("submitting");
        //console.log(userEdit);
    }
    function enableEdit(){
        setUserEdit({edit: !userEdit.edit, user: props.user})
    }
    return (
        <div id="userDetails" className="account-feature">
            <h2>Account</h2>
            <div className="profile-wrap">
                <img className="avatar-img " src={props.user.avatarUrl} alt="" />
                <div className="profile-details">
                    <ul>
                        <li className=""><span className="account-label-front">Username:</span>{props.user.username}</li>
                        <li className="account-label-front"><span className="account-label-front">User ID:</span>{props.user.id}</li>
                        <li className="account-label-front"><span className="account-label-front">Status:</span>{props.user.ownsEco ? "Owns Eco" : "Purchase Eco"}</li>
                        <li className="account-label-front"><span className="account-label-front">Type:</span>{props.user.isDeveloper ? "Developer" : "Purchase Eco"}</li>
                    </ul>
                </div>
            </div>
            <div className="btn-corner">
                <a className="btn btn-small" href="/buy">Upgrade</a>
                <button className="btn btn-small">Change Icon</button>
                <button className="btn btn-small" id="account-edit" onClick={enableEdit}>Edit Account</button>
                <a className="btn btn-small" href="/logout">Logout</a>
            </div>
            {
                // display edit form if edit is true 
                userEdit.edit ? (
                    <div className="">
                        { error.type != null ? (<p>{error.message}</p>) : null }
                        <div className="update-account pt-2">
                            <input onChange={handleInputChange} className="form-control" type="email" title="email" name="email" placeholder="Enter Email" />
                            <input onChange={handleInputChange} className="form-control" type="text" title="username" name="username" placeholder="Enter Username" value={userEdit.user.username} />
                            <input onChange={handleInputChange} className="form-control" type="password" name="password" title="password" placeholder="Enter New Password" />
                            <input onChange={handleInputChange} className="form-control" type="password" name="passwordConfirm" placeholder="Confirm New Password" />
                            <input onSubmit={handleSubmit} className="btn btn-small" type="submit" value="Update" />
                        </div>
                        {
                            Object.keys(userEdit.user).map((key, index) => {
                                return (
                                    <div key={index}>
                                        <li>{key}: {userEdit.user[key]}</li>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : null
            }
        </div>
    );
}
export default UserCard
import { useState } from 'react';
import { AuthenticatedUser, useIsUserAdmin } from '../../utils/authentication';
import { useMutation } from '@tanstack/react-query';
import { getIcon } from '../../utils/account';
// Temporary icons until we have a proper icon migration of teirs
const icons = "alphaicon;alpha4packicon;alpha2packicon;devicon;hareicon;bannericon;wolficon;hareicon;supericon;slgicon";

function UserCard(props: any) {
    const [error, setError] = useState("");
    const [userEdit, setUserEdit] = useState({ edit: false, user: {
        password: "",
        passwordConfirm: ""
    } });
    const selectedIcon = (props.user.isSLG) ? "slgicon" : "betaicon";
    const icon = `/images/icons/${getIcon(selectedIcon, icons)}.png`;
    const updateUserMutate = useMutation({
        mutationFn: (url: string) => {
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    });
    
    function doUpdateUser(): void {
        if (userEdit.user.password != userEdit.user.passwordConfirm) {
            setError("Passwords do not match");
            return;
        } else {
            const userJWT = AuthenticatedUser();
            const queryString: string = `?token=${userJWT}&newpassword${userEdit.user.password}`
            updateUserMutate.mutate(`${import.meta.env.VITE_CLOUD_API_URL}PasswordReset/ResetPassword?${queryString}`);
            if (updateUserMutate.isSuccess) {
                location.reload();
            }
            if (updateUserMutate.isError || error) {
                console.log(updateUserMutate.error);
                setError("There was an error registering your account.");
            }
        }
    }


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserEdit({ edit: userEdit.edit, user: { ...userEdit.user, [name]: value } });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("submitting");
        doUpdateUser();
    }
    function enableEdit(){
        setUserEdit({edit: !userEdit.edit, user: props.user})
    }
    return (
        <div id="userDetails" className="account-feature">
            <h2>Account</h2>
            <div className="profile-wrap">
                <img className="avatar-img " src={icon} alt="" />
                <div className="profile-details">
                    <ul className=''>
                        <li className=""><span className="account-label-front">Username:</span>{props.user.username}</li>
                        <li className="account-label-front"><span className="account-label-front">User ID:</span>{props.user.id}</li>
                        <li className="account-label-front"><span className="account-label-front">Status:</span>{props.user.ownsEco ? "Owns Eco" : <a href="/buy">Purchase Eco here</a>}</li>
                        <li className="account-label-front"><span className="account-label-front">Type:</span>{props.user.isSLG ? "Developer" : "Standard"}</li>
                        <li className="account-label-front"><span className="account-label-front">Eco Credits Balance:</span>{props.user.ecoCredits}</li>
                    </ul>
                </div>
            </div>
            <div className="btn-corner">
                { !props.user.ownsEco ? <a className="btn btn-small" href="/buy">Buy Eco</a> : null 
                }
                <a className="btn btn-small" href="/buy">Buy Eco Credits</a>
                <button className="btn btn-small">Change Icon</button>
                <button className="btn btn-small" id="account-edit" onClick={enableEdit}>Edit Account</button>
                {
                    // display admin button if user is admin
                    useIsUserAdmin(AuthenticatedUser() as string) ? (
                        <a className="btn btn-small" href="/admin">Admin</a>
                    ) : null
                }
                <a className="btn btn-small logout-btn" href="/logout">Logout</a>
            </div>
            {
                // display edit form if edit is true 
                userEdit.edit ? (
                    <div className="">
                        { error != null ? (<p>{error}</p>) : null }
                        <div className="update-account pt-2">
                            <input onChange={handleInputChange} className="form-control" type="password" name="password" title="password" placeholder="Enter New Password" />
                            <input onChange={handleInputChange} className="form-control" type="password" name="passwordConfirm" placeholder="Confirm New Password" />
                            <input onSubmit={handleSubmit} className="btn btn-small" type="submit" value="Update" />
                        </div> 
                    </div>
                ) : null
            }
        </div>
    );
}
export default UserCard
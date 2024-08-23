import { useState } from 'react';
import { AuthenticatedUser, useIsUserAdmin } from '../../utils/authentication';
import { useMutation } from '@tanstack/react-query';
import { getIcon } from '../../utils/account';
import { Link } from '@tanstack/react-router';
// Temporary icons until we have a proper icon migration of teirs
const icons = "alphaicon;alpha4packicon;alpha2packicon;devicon;hareicon;bannericon;wolficon;hareicon;supericon;slgicon";
// switch((props.user.isSLG) ? "slgicon" : "betaicon";)
function UserCard(props: any) {
    const [error, setError] = useState("");
    const userJWT = AuthenticatedUser();
    const [userEdit, setUserEdit] = useState({ edit: false, user: {
        password: "",
        passwordConfirm: ""
    } });
    let selectedIcon;
    if (props.user.isSLG) {
        selectedIcon = "slgicon";
    } else {
        if (props.user.isSLG) {
            return "SLG";
        }  else if (props.user.isDevTier) {
            selectedIcon = "devicon";
        } else if (props.user.isWolfWhisperer) {
            selectedIcon = "wolficon";
        } else if (props.user.isAlphaBaker) {
            selectedIcon = "alphaicon";
        } else if (props.user.ownsEco) {
            selectedIcon = "betaicon";
        } else {
            selectedIcon = "standardicon";
        }
    }
    const icon = `/images/icons/${getIcon(selectedIcon, icons)}.png`;
    const updateUserMutate = useMutation({
        mutationFn: (password: string) => {
            const url = `${import.meta.env.VITE_CLOUD_API_URL}PasswordReset/ResetPassword`;
            return fetch(url, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: userJWT,
                    password: password,
                })
            });
        },
        onSuccess: (response) => {
            if (response.ok) {
                location.reload();
            } else {
                setError("There was an unexpected error updating your account.");
            }
        },
        onError: (error: any, response) => {
            console.log(response);
            setError("There was an error registering your account.");
        }
    });
    
    function doUpdateUser(): void {
        console.log("checking passwords");
        
        if (userEdit.user.password != userEdit.user.passwordConfirm) {
            setError("Passwords do not match");
            return;
        } else {
            console.log("updating user");
            
            updateUserMutate.mutate(userEdit.user.password);
            if (updateUserMutate.isError || error) {
                setError("There was an error registering your account.");
            }
        }
    }


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserEdit({ edit: userEdit.edit, user: { ...userEdit.user, [name]: value } });
    }

    function handleSubmit(e: React.FormEvent) {
        console.log("submitting form");
        
        e.preventDefault();
        doUpdateUser();
    }
    function enableEdit(){
        setUserEdit({edit: !userEdit.edit, user: props.user})
    }
    function getGameTeir () {
        if (props.user.isSLG) {
            return (props.user.isCloudAdmin) ? "SLG Admin" : "SLG";
        }  else if (props.user.isDevTier) {
            return "Developer Tier";
        } else if (props.user.isWolfWhisperer) {
            return "Wolf Whisperer";
        } else if (props.user.isAlphaBaker) {
            return "Alpha Backer";
        } else if (props.user.ownsEco) {
            return "Beta";
        } else {
            return "Standard";
        }
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
                        <li className="account-label-front"><span className="account-label-front">Account Created:</span>{new Date(props.user.creationTime).toLocaleString()}</li>
                        <li className="account-label-front"><span className="account-label-front">Status:</span>{props.user.ownsEco ? "Owns Eco" : <Link to="/buy">Purchase Eco here</Link>}</li>
                        <li className="account-label-front"><span className="account-label-front">Teir:</span>{getGameTeir()}</li>
                        <li className="account-label-front"><span className="account-label-front">Eco Credits Balance:</span>{props.user.ecoCredits}</li>
                    </ul>
                </div>
            </div>
            <div className="btn-corner">
                { !props.user.ownsEco ? <Link className="btn btn-small" to="/buy">Purchase Eco</Link> : null 
                }
                <Link className="btn btn-small" to="/buy">Buy Eco Credits</Link>
                <button className="btn btn-small">Change Icon</button>
                <button className="btn btn-small" id="account-edit" onClick={enableEdit}>Edit Account</button>
                {
                    // display admin button if user is admin
                    useIsUserAdmin(AuthenticatedUser() as string) ? (
                        <Link className="btn btn-small" to="/account/admin">Admin</Link>
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
                            <form onSubmit={handleSubmit}>
                                <input onChange={handleInputChange} className="form-control" type="password" name="password" title="password" placeholder="Enter New Password" />
                                <input onChange={handleInputChange} className="form-control" type="password" name="passwordConfirm" placeholder="Confirm New Password" />
                                <input className="btn btn-small" type="submit" value="Update" />
                            </form>
                        </div> 
                    </div>
                ) : null
            }
        </div>
    );
}
export default UserCard
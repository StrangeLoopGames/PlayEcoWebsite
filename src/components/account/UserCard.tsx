function UserCard(props: any) {
    console.log(props);

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
                    </ul>
                </div>
            </div>
            <div className="btn-corner">
                <a className="btn btn-small" href="/buy">Upgrade</a>
                <div className="btn btn-small">Change Icon</div>
                <div className="btn btn-small" id="account-edit">Edit Account</div>
                <a className="btn btn-small" href="/logout">Logout</a>
            </div>
        </div>
    );
}
export default UserCard
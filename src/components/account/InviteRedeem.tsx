import { AuthenticatedUser } from "../../utils/authentication";

export function InviteRedeem () {

    function handleRedeemInvite(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const invite_code = (e.currentTarget.elements.namedItem('invite_code') as HTMLInputElement).value;
        fetch(`${import.meta.env.VITE_CLOUD_API_URL}Invites/RedeemInvite?inviteGuid=${invite_code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AuthenticatedUser()}`
            },
        }).then((res) => {
            if (res.status === 200) {
                location.reload();
            } else {
                res.json().then((errorResponse) => {
                    console.log(errorResponse);
                    location.href = `/account?error=invite_redeem_error`;
                });
            }
        }).catch((error) => {
            console.log(error);
            alert('There was an error redeeming the invite');
        });
    }
    return (
        <div className="account-label">
        <p>If you have been given an invite code enter it below</p>
        <form onSubmit={handleRedeemInvite} className="d-flex gap-2" action="">
        <input type="text" className="w-50" name="invite_code" id="invite_code" placeholder="Invite Code" />
        <input type="submit" className="btn btn-small" value="Redeem" />
    </form>
    </div>
    )
}
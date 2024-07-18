import { User } from "../../types/types"
import { AuthenticatedUser } from "../../utils/authentication"

function TwitchCard({user}:{user: User}) {
    return (
        <div className="account-feature">
            <h2>Steam Link</h2>
            <div className="account-label">
                {
                user.steamId ? (
                    <p>Your Eco account has been linked to Steam.</p>
                ) : (
                    <>
                    <p>Link your Eco account to your Steam account..</p>
                    <a href={`${import.meta.env.VITE_CLOUD_API_URL}api/Registration/RegisterWithSteam?token=${AuthenticatedUser()}`} className="btn btn-small">Link Steam</a>
                    </>
                )
                }
            </div>
        </div>
    )
}
export default TwitchCard

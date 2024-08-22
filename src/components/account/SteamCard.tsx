import { User } from "../../types/types"
import { AuthenticatedUser } from "../../utils/authentication"

function TwitchCard({user}:{user: User | null | undefined}) {
    const steamClientId = import.meta.env.VITE_STEAM_CLIENT_ID;
    return (
        <div className="account-feature">
            <h2>Steam Link</h2>
            <div className="account-label">
                {
                user && user.steamId ? (
                    <p>Your Eco account has been linked to Steam.</p>
                ) : (
                    <>
                    <p>Link your Eco account to your Steam account..</p>
                    <a href={`https://steamcommunity.com/oauth/login?response_type=token&client_id=${steamClientId}`} className="btn btn-small">Link Steam</a>
                    </>
                )
                }
            </div>
        </div>
    )
}
export default TwitchCard

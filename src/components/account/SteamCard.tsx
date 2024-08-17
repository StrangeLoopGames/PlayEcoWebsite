import { User } from "../../types/types"
import { AuthenticatedUser } from "../../utils/authentication"

function TwitchCard({user}:{user: User | null | undefined}) {
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
                    </>
                )
                }
            </div>
        </div>
    )
}
export default TwitchCard

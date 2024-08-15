function TwitchCard({ user }: { user: User | undefined | null }) {
    return (
        <div id="twitch" className="account-feature">
            <h2>Twitch Link</h2>
            <div className="account-label">
                {
                    user && user.twitchUsername != null && user.twitchId != null ? (
                        <div>
                            Your Twitch account is linked to Eco.
                            <div className="account-twitch"><b>Twitch Username:</b> {user.twitchUsername}</div>
                            To find your drops, login to the game and open your void storage (spinning Strange Loop Games Logo) at the bottom of your screen.
                        </div>
                    ) : (
                        <div>
                            Link your Eco account to your Twitch account.
                            <a href="https://id.twitch.tv/oauth2/authorize?client_id=ddyqfm84zm2a3dny5vv2yyypnbcj5p&redirect_uri=https://play.eco/account/twitch-callback&response_type=code&scope=user:read:email"
                                className="btn btn-small btn-corner">
                                    Link Your Twitch
                            </a>
                        </div>
                    )}
            </div>
        </div>
    )
}
export default TwitchCard
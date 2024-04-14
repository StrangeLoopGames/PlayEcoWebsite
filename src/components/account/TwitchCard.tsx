function TwitchCard(props: any) {
    const twitchUsername: string | null = props.user.twitchUsername;
    const twitchId: string | null = props.user.twitchId;
    return (
        <div className="account-feature">
            <h2>Twitch Link</h2>
            <div className="account-label">
                {twitchUsername != null && twitchId != null ? (
                    <div>
                        Your Twitch account is linked to Eco.
                        <div className="account-twitch"><b>Twitch Username:</b> {twitchUsername}</div>
                        To find your drops, login to the game and open your void storage (spinning Strange Loop Games Logo) at the bottom of your screen.
                        <a href="" target="_blank" className="btn btn-small btn-corner">Remove Twitch Account</a>
                    </div>
                ) : (
                    <div>
                        Link your Eco account to your Twitch account.
                        <a href="" target="_blank" className="btn btn-small btn-corner">Link Your Twitch</a>
                    </div>
                )}
            </div>
        </div>
    )
}
export default TwitchCard
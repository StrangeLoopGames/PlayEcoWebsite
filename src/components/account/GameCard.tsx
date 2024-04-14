function GameCard() {
    return (
        <div className="account-feature account-download-wrapper">
        <h2 className="title-medium-white account-feature-title">Game Key</h2>
        <div className="account-feature-description">
            If you have received a game key, you can upgrade your account.
            <div className="btn-corner">
                <form id="updateKeyForm" action="" method="" className="account-form payForm">
                    <input className="form-control global-input-shortleft" type="text" name="key" placeholder="Game Key" value="" />
                        <input className="btn btn-small" type="submit" name="submit" value="Update" />
                        </form>
                    </div>
            </div>
        </div>
    )
}
export default GameCard
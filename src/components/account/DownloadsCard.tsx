import { User } from "../../types/types"
import { AccountDownloadWrapper } from "./AccountDownloadWrapper"

function DownloadsCard({ user }: { user: User }) {
    return (
        <>
        {
        user && user.ownsEco ? (
            <>
                <AccountDownloadWrapper />
            </>
        ) : (
            <div className="account-feature account-download-wrapper">
                <h2>Game Downloads</h2>
                <p className="">
                    You must own Eco to download the game. <a href="/buy">Purchase Eco here</a>.
                </p>
            </div>
        )
        }
        </>

    )
} export default DownloadsCard
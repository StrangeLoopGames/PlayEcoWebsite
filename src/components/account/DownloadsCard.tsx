import { User } from "../../types/types"
import { AccountDownloadWrapper } from "./AccountDownloadWrapper"

function DownloadsCard({ user }: { user: User }) {
    // return (
    //     <div className="account-feature account-download-wrapper">
    //         <div className="account-label">
    //             <h2>Downloads</h2>
    //             <p className="title-medium-white account-feature-title"><span className="fw-bold"> {`version here`} </span>- The current version of Eco  <span> (* Singleplayer not supported)</span></p>
    //             <div className="btn-corner">
    //                 <a className="btn btn-small" id="more-downloads">{`moreDownloads`}</a>
    //             </div>
    //         </div>
    //         <div className="mt-1 mb-2 left">
    //             <table className="w-100">
    //                 <tr>
    //                     <td>
    //                         <div className="download-link"><a href="/s3/release/EcoPC_v{Model.CurrentVersion2}{Model.CurrentCategory2}.zip">
    //                             <FontAwesomeIcon className="download-icon" icon={faWindows} />{`game`}<div>{`win64`}
    //                             </div></a>
    //                         </div>
    //                     </td>
    //                     <td>
    //                     <div className="download-link"><a href="/s3/release/EcoLinux_v{Model.CurrentVersion2}{Model.CurrentCategory2}.zip">
    //                         <FontAwesomeIcon className="download-icon"icon={faLinux} />{`game`}<div>{`linux`} *
    //                         </div></a>
    //                     </div>
    //                     </td>
    //                     <td>
    //                         <div className="download-link"><a href="/s3/release/EcoOSX_v{Model.CurrentVersion2}{Model.CurrentCategory2}.tar.gz">
    //                             <FontAwesomeIcon className="download-icon"icon={faApple} />{`game`}<div>{`mac`} *
    //                             </div></a>
    //                         </div>
    //                     </td>
    //                     <td>
    //                     <div className="download-link"><a href="/s3/release/EcoModKit_v{Model.CurrentVersion2}{Model.CurrentCategory2}.zip">
    //                         <FontAwesomeIcon className="download-icon"icon={faUnity} />{`modKit`}
    //                         </a></div>
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                 <td>
    //                     <div className="download-link"><a href="/s3/release/EcoServerPC_v{Model.CurrentVersion2}{Model.CurrentCategory2}.zip">
    //                         <FontAwesomeIcon className="download-icon"icon={faWindows} />{`server`}<div>{`win64`}
    //                         </div></a>
    //                     </div>
    //                     </td>
    //                     <td>
    //                     <div className="download-link"><a href="/s3/release/EcoServerLinux_v{Model.CurrentVersion2}{Model.CurrentCategory2}.zip">
    //                         <FontAwesomeIcon className="download-icon"icon={faLinux} />{`server`}<div>{`linux`}
    //                         </div></a>
    //                     </div>
    //                     </td>
    //                     <td>
    //                     <div className="download-link"><a href="/s3/release/EcoServerOSX_v{Model.CurrentVersion2}{Model.CurrentCategory2}.tar.gz">
    //                         <FontAwesomeIcon className="download-icon"icon={faApple} />{`server`}<div>{`mac`}
    //                         </div></a>
    //                     </div>
    //                     </td>
    //                 </tr>
    //             </table>

    //         </div>
    //         <div id="more-downloads-div">
    //             <div className="account-label">
    //                 <p className="title-medium-white account-feature-title"><span className="text-capitalize fw-bold">{`staging version here`} - </span> For advanced users that want to test the most recent, unstable version</p>
    //             </div>
    //             <div className="mb-4 text-left">
    //                 <div className="download-link"><a href="/s3/staging/EcoPC_v{stagingFilename}.zip"><FontAwesomeIcon className="download-icon"icon={faWindows} />{`game`}<div>{`win64`}</div></a></div>
    //                 <div className="download-link"><a href="/s3/staging/EcoPC_v{stagingFilename}.zip"><FontAwesomeIcon className="download-icon"icon={faWindows} />{`server`}<div>{`win64`}</div></a></div>
    //                 <div className="download-link"><a href="/s3/staging/EcoServerPC32_v{stagingFilename}.zip"><FontAwesomeIcon className="download-icon"icon={faWindows} />{`server`}<div>{`win32`}</div></a></div>
    //                 <div className="download-link"><a href="/s3/staging/EcoServerOSX_v{stagingFilename}.tar.gz"><FontAwesomeIcon className="download-icon"icon={faApple} />{`server`}<div>{`mac`}</div></a></div>
    //                 <div className="download-link"><a href="/s3/staging/EcoServerLinux_v{stagingFilename}.zip"><FontAwesomeIcon className="download-icon"icon={faLinux} />{`server`}<div>{`linux`}</div></a></div>
    //                 <div className="download-link"><a href="/s3/staging/EcoModKit_v{stagingFilename}.zip"><FontAwesomeIcon className="download-icon"icon={faUnity} />{`modKit`}</a></div>
    //             </div>
    //             <a className="btn btn-small download-archive-btn" href="/gameversions">{`archivedDownloads`}</a>
    //         </div>
    //     </div>
    // )
    return (
        <>
        {
        user && user.ownsEco ? (
            <>
                <AccountDownloadWrapper />
            </>
        ) : (
            <div className="account-feature account-download-wrapper">
                <h2>gameDownload</h2>
                <p className="">
                    You must own Eco to download the game. <a href="/buy">Purchase Eco here</a>.
                </p>
            </div>
        )
        }
        </>

    )
} export default DownloadsCard
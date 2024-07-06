import { faWindows, faApple, faLinux, faUnity } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useGetGameVersions} from '../../utils/api';
import { useEffect, useState } from "react";
import { Version } from "../../types/types";
export function AccountDownloadWrapper() {
    // use useGetGameVersions to get game versions and set the first to releaseVersion to the first index that doesn't have a commit value, and then set stagingVersion to the first index that does have a commit value
    const { data: versions, error, isLoading } = useGetGameVersions();
    const [releaseVersion, setReleaseVersion] = useState<Version | null>(null);
    const [stagingVersion, setStagingVersion] = useState<Version | null>(null);
    const [stagingFilename, setStagingFilename] = useState<string>("");
    const [showMoreDownloads, setShowMoreDownloads] = useState<boolean>(false);
    useEffect(() => {
        if (!isLoading && versions != null) {
            const release = versions.find((version: Version) => !version.commitNumber);
            const staging = versions.find((version: Version) => version.commitNumber);
            setReleaseVersion(release);
            setStagingVersion(staging);
            setStagingFilename(`${staging?.versionNumber}-${staging?.versionCategory}`);
            
        }
    }, [versions, isLoading]);
    return (
        <div className="account-feature account-download-wrapper">
            <h2>Game Downloads</h2>
            {
            isLoading ? (
                <div className="text-left">Loading Downloads</div>
            ) : error ? (
                <div className="text-left text-danger">An error occurred</div>
            ) : versions != null && versions ? (
                <>
                <div className="account-label">
                                <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>
                                    {`${releaseVersion?.versionCategory} ${releaseVersion?.versionNumber}`}
                                </span>
                                - The current version of Eco <span style={{ fontSize: '17px' }}>(* Singleplayer not supported)</span>

                                <div className="btn-corner">
                                    <a className="btn btn-small" id="more-downloads" onClick={() => setShowMoreDownloads(prevState => !prevState)} >
                                        More Downloads
                                    </a>
                                </div>
                            </div>
                            <div style={{ margin: '10px 0 20px', textAlign: 'left' }}>
                                <div className="download-link">
                                    <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/release/EcoPC_v0.${releaseVersion?.versionNumber}-${releaseVersion?.versionCategory}.zip`} download>
                                        <FontAwesomeIcon className="download-icon" icon={faWindows} />
                                        game
                                        <div>win64</div>
                                    </a>
                                </div>
                                <div className="download-link">
                                    <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/release/EcoOSX_v0.${releaseVersion?.versionNumber}-${releaseVersion?.versionCategory}.tar.gz`} download>
                                        <FontAwesomeIcon className="download-icon" icon={faApple} />
                                        game
                                        <div>mac *</div>
                                    </a>
                                </div>
                                <div className="download-link">
                                    <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/release/EcoLinux_v0.${releaseVersion?.versionNumber}-${releaseVersion?.versionCategory}.zip`} download>
                                        <FontAwesomeIcon className="download-icon" icon={faLinux} />
                                        game
                                        <div>linux *</div>
                                    </a>
                                </div>
                                <div className="download-link">
                                    <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/release/EcoModKit_v0.${releaseVersion?.versionNumber}-${releaseVersion?.versionCategory}.zip`} download>
                                        <FontAwesomeIcon className="download-icon" icon={faUnity} />
                                        modKit
                                    </a>
                                </div>
                                <div className="download-link">
                                    <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/release/EcoServerPC_v0.${releaseVersion?.versionNumber}-${releaseVersion?.versionCategory}.zip`} download>
                                        <FontAwesomeIcon className="download-icon" icon={faWindows} />
                                        server
                                        <div>win64</div>
                                    </a>
                                </div>
                                <div className="download-link">
                                    <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/release/EcoServerOSX_v0.${releaseVersion?.versionNumber}-${releaseVersion?.versionCategory}.tar.gz`} download>
                                        <FontAwesomeIcon className="download-icon" icon={faApple} />
                                        server
                                        <div>mac</div>
                                    </a>
                                </div>
                                <div className="download-link">
                                    <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/release/EcoServerLinux_v0.${releaseVersion?.versionNumber}-${releaseVersion?.versionCategory}.zip`} download>
                                        <FontAwesomeIcon className="download-icon" icon={faLinux} />
                                        server
                                        <div>linux</div>
                                    </a>
                                </div>
                            </div>
                            
                            <div id="more-downloads-div" style={showMoreDownloads ? { display: 'block' } : { display: 'none' }}>
                                <div className="account-label">
                                    <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>
                                        staging - 
                                        {`${stagingVersion?.versionCategory} ${stagingVersion?.versionNumber} #${stagingVersion?.commitNumber}`} - 
                                    </span> For advanced users that want to test the most recent, unstable version
                                </div>
                                <div style={{ margin: '0 0 40px', textAlign: 'left' }}>
                                    <div className="download-link">
                                        <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/staging/EcoPC_v0.${stagingVersion?.versionNumber}-${stagingVersion?.versionCategory}-staging-${stagingVersion?.commitNumber}.zip`} download>
                                            <FontAwesomeIcon className="download-icon" icon={faWindows} />
                                            game
                                            <div>win64</div>
                                        </a>
                                    </div>
                                    <div className="download-link">
                                        <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/staging/EcoPC_v0.${stagingVersion?.versionNumber}-${stagingVersion?.versionCategory}-staging-${stagingVersion?.commitNumber}.zip`} download>
                                            <FontAwesomeIcon className="download-icon" icon={faWindows} />
                                            server
                                            <div>win64</div>
                                        </a>
                                    </div>
                                    <div className="download-link">
                                        <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/staging/EcoServerPC32_v0.${stagingVersion?.versionNumber}-${stagingVersion?.versionCategory}-staging-${stagingVersion?.commitNumber}.zip`} download>
                                            <FontAwesomeIcon className="download-icon" icon={faWindows} />
                                            server
                                            <div>win32</div>
                                        </a>
                                    </div>
                                    <div className="download-link">
                                        <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/staging/EcoServerOSX_v0.${stagingVersion?.versionNumber}-${stagingVersion?.versionCategory}-staging-${stagingVersion?.commitNumber}.tar.gz`} download>
                                            <FontAwesomeIcon className="download-icon" icon={faApple} />
                                            server
                                            <div>mac</div>
                                        </a>
                                    </div>
                                    <div className="download-link">
                                        <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/staging/EcoServerLinux_v0.${stagingVersion?.versionNumber}-${stagingVersion?.versionCategory}-staging-${stagingVersion?.commitNumber}.zip`} download>
                                            <FontAwesomeIcon className="download-icon" icon={faLinux} />
                                            server
                                            <div>linux</div>
                                        </a>
                                    </div>
                                    <div className="download-link">
                                        <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/staging/EcoModKit_v0.${stagingVersion?.versionNumber}-${stagingVersion?.versionCategory}-staging-${stagingVersion?.commitNumber}.zip`} download>
                                            <FontAwesomeIcon className="download-icon" icon={faUnity} />
                                            modKit
                                        </a>
                                    </div>
                                </div>
                                <a className="btn btn-small" style={{ position: 'static', float: 'right', marginTop: '-51px' }} href="/gameversions">
                                    Archived Downloads
                                </a>
                            </div>
                </>
            ) : (
                <div className="text-left">No Downloads Found</div>
            )
            }
        </div>
    );
};
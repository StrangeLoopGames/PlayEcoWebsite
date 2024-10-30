import { useEffect, useState } from 'react';
import { useGetGameVersions } from '../../utils/api';
import { Version, GroupedVersion } from '../../types/types';
import { Accordion } from 'react-bootstrap';
import { downloadVersion } from '../../utils/account';

function constructDownloadUrl(base: string, version: string, category: string, type: string) {
    return `${import.meta.env.VITE_CLOUD_API_URL}s3/release/${base}_v0.${version}-${category}.${type}`;
}

function groupVersions(versions: Version[]): GroupedVersion[] {
    const grouped: Record<string, Version[]> = {};
    versions.forEach(version => {
        const baseVersion = version.versionNumber.split('.').slice(0, 2).join('.'); // Get major.minor version only
        if (!grouped[baseVersion]) {
            grouped[baseVersion] = [];
        }
        const completeVersion = {
            ...version,
            downloadUrls: {
                windows64: constructDownloadUrl('EcoPC', version.versionNumber, version.versionCategory, 'zip'),
                windows32: constructDownloadUrl('EcoPC32', version.versionNumber, version.versionCategory, 'zip'),
                mac: constructDownloadUrl('EcoOSX', version.versionNumber, version.versionCategory, 'tar.gz'),
                linux: constructDownloadUrl('EcoLinux', version.versionNumber, version.versionCategory, 'zip'),
                server: {
                    linux: constructDownloadUrl('EcoServerLinux', version.versionNumber, version.versionCategory, 'zip'),
                    mac: constructDownloadUrl('EcoServerOSX', version.versionNumber, version.versionCategory, 'tar.gz'),
                    pc: constructDownloadUrl('EcoServerPC', version.versionNumber, version.versionCategory, 'zip')
                }
            }
        };
        grouped[baseVersion].push(completeVersion);
    });

    return Object.entries(grouped).map(([baseVersion, versions]) => ({
        baseVersion,
        versions
    }));
}

export function DownloadArchive() {
    const [groupedVersions, setGroupedVersions] = useState<GroupedVersion[]>([]);
    const { data: versions, isLoading, error } = useGetGameVersions();

    useEffect(() => {
        if (!isLoading && versions) {
            setGroupedVersions(groupVersions(versions));
        }
    }, [versions, isLoading]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading versions!</div>;

    return (
        <section className='page-wrap-main d-flex col-lg-offset-2 col-lg-8 justify-content-center'>
            <div className="col-md-12">
                <h1 className="mb-4">Download Archive</h1>
                {
                    groupedVersions.length > 0 ? (
                        groupedVersions.map(({ baseVersion, versions }) => (
                            <div key={baseVersion} className="feature-box">
                                <h2>Beta {baseVersion}</h2>
                                <Accordion defaultActiveKey="0">
                                    {/* Windows 64-bit Client */}
                                    <Accordion.Item eventKey={`windows64-${baseVersion}`} className="w-100">
                                        <Accordion.Header className="w-100">Windows 64-bit Client</Accordion.Header>
                                        <Accordion.Body className="w-100">
                                            {versions.map(v => (
                                                <div key={v.versionNumber}>
                                                    <a onClick={downloadVersion} href={v.downloadUrls.windows64}>Beta {v.versionNumber}</a>
                                                </div>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {/* Linux Client */}
                                    <Accordion.Item eventKey={`linux-${baseVersion}`} className="w-100">
                                        <Accordion.Header className="w-100">Linux Client</Accordion.Header>
                                        <Accordion.Body className="w-100">
                                            {versions.map(v => (
                                                <div key={v.versionNumber}>
                                                    <a onClick={downloadVersion} href={v.downloadUrls.linux}>Beta {v.versionNumber}</a>
                                                </div>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {/* Mac Client */}
                                    <Accordion.Item eventKey={`mac-${baseVersion}`} className="w-100">
                                        <Accordion.Header className="w-100">Mac Client</Accordion.Header>
                                        <Accordion.Body className="w-100">
                                            {versions.map(v => (
                                                <div key={v.versionNumber}>
                                                    <a onClick={downloadVersion} href={v.downloadUrls.mac}>Beta {v.versionNumber}</a>
                                                </div>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {/* Server */}
                                    <Accordion.Item eventKey={`server-${baseVersion}`} className="w-100">
                                        <Accordion.Header className="w-100">Server</Accordion.Header>
                                        <Accordion.Body className="w-10">
                                            {/* Linux Server */}
                                            <Accordion className='d-flex gap-2'>
                                                <Accordion.Item eventKey={`server-linux-${baseVersion}`} className="col-4">
                                                    <Accordion.Header className="w-100 col-12">Linux Server</Accordion.Header>
                                                    <Accordion.Body className="w-100">
                                                        {versions.map(v => (
                                                            <div key={v.versionNumber}>
                                                                <a onClick={downloadVersion} href={v.downloadUrls.server.linux}>Beta {v.versionNumber}</a>
                                                            </div>
                                                        ))}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                {/* Mac Server */}
                                                <Accordion.Item eventKey={`server-mac-${baseVersion}`} className="col-4">
                                                    <Accordion.Header className="w-100">Mac Server</Accordion.Header>
                                                    <Accordion.Body className="w-100">
                                                        {versions.map(v => (
                                                            <div key={v.versionNumber}>
                                                                <a onClick={downloadVersion} href={v.downloadUrls.server.mac}>Beta {v.versionNumber}</a>
                                                            </div>
                                                        ))}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                {/* PC Server */}
                                                <Accordion.Item eventKey={`server-pc-${baseVersion}`} className="col-4">
                                                    <Accordion.Header className="w-100">PC Server</Accordion.Header>
                                                    <Accordion.Body className="w-100">
                                                        {versions.map(v => (
                                                            <div key={v.versionNumber}>
                                                                <a onClick={downloadVersion} href={v.downloadUrls.server.pc}>Beta {v.versionNumber}</a>
                                                            </div>
                                                        ))}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        ))
                    ) : (
                        <div>No versions found</div>
                    )
                }
            </div>
        </section>
    );
}
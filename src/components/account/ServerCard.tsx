import { useEffect, useState } from 'react';
import { AuthenticatedUser, removeToken, useGetServerToken } from '../../utils/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCopy, faEye, faEyeSlash, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../types/types';
// Temporary icons until we have a proper icon migration of teirs
const icons = "alphaicon;alpha4packicon;alpha2packicon;devicon;hareicon;bannericon;wolficon;hareicon;supericon;slgicon";
// switch((props.user.isSLG) ? "slgicon" : "betaicon";)
export function ServerToken({jwt} : {jwt: string}) {
    const { data: token, isLoading: tokenLoading, error: tokenError, refetch } = useGetServerToken(jwt as string);
    const [showToken, setShowToken] = useState<boolean>(false);
    const [serverToken, setServerToken] = useState<string | null>(null);
    function copyInvite() {
        if (token && token != null) {
            navigator.clipboard.writeText(serverToken as string);
        }
    }
    useEffect(() => {
        if (token && token != null) {
            setServerToken(token as string);
        }
    }, [token])
    return (
        <>
            {
                serverToken && serverToken != null ? (
                    
                    <div className="token-wrap d-flex w-50 gap-2">
                        <input title="servertoken" type="text" className="w-100" name="invite_code" id="invite_code" value={showToken ? serverToken as string : "*************************"} />
                        <button title="Show Invite" onClick={() => setShowToken(!showToken)} className="btn btn-small">
                            <FontAwesomeIcon icon={showToken ? faEyeSlash : faEye} />
                        </button>
                        <button title="Show Invite" onClick={copyInvite} className="btn btn-small">
                            <FontAwesomeIcon icon={faCopy} />
                        </button>
                    </div>
                ) : tokenError ? (
                    <>
                    <div className="text-left">There was an error generating your token</div>
                    <button onClick={() => refetch()} className="btn btn-small">
                        <FontAwesomeIcon icon={faRefresh} />
                    </button>
                    </>
                ) : (
                    <div className="text-left"><p className='fw-bold'>Generating token</p></div>
                )
            }
        </>
    )
}
function ServerCard({ user }: { user: User | null | undefined }) {
    const [getToken, setGetToken] = useState<boolean>(false);
    const userJWT = AuthenticatedUser();

    function invalidateTokens(): void {
        const url = `${import.meta.env.VITE_CLOUD_API_URL}Authentication/RevokeAllTokens`;
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${userJWT as string}`,
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (!res.ok) {
                throw new Error("There was an error revoking the tokens");
            }
            removeToken();
            location.href = '/login?error=tokens_revoked';
        });
    }

    return (
        <div id="userDetails" className="account-feature">
            <h2>Server Authentication</h2>
            <div className="account-feature-description">
                <p>Eco servers now require authentication. You can generate a new token at any time. <p> <span className="fw-bold">Warning!</span> Purging all tokens will log you out and invalidate all tokens being used by servers.</p></p>
            </div>
            <div className="d-flex gap-2 py-2 w-75">
            <button onClick={invalidateTokens} className="btn btn-small logout-btn">
                <FontAwesomeIcon icon={faTrash} />
                        <span title="Purge all tokens" className="px-2">Purge all tokens</span>
                    </button>
            </div>
            <div className="d-flex gap-2 py-2 w-75">
            {
                getToken ? (
                    <ServerToken jwt={userJWT as string} />
                ) : (
                    <button onClick={() => setGetToken(true)} className="btn btn-small" title="Generate Token">
                        <FontAwesomeIcon icon={faAdd} />
                        <span className='px-2'>Generate Token</span>
                    </button>
                )
            }

            </div>
        </div>
    );
}
export default ServerCard
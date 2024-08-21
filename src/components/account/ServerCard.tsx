import { useState } from 'react';
import { AuthenticatedUser } from '../../utils/authentication';
import { useMutation } from '@tanstack/react-query';
import { getIcon } from '../../utils/account';
import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCopy, faEye, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
// Temporary icons until we have a proper icon migration of teirs
const icons = "alphaicon;alpha4packicon;alpha2packicon;devicon;hareicon;bannericon;wolficon;hareicon;supericon;slgicon";
// switch((props.user.isSLG) ? "slgicon" : "betaicon";)
type ServerToken = {
    token: string;
    show: boolean;
}

function ServerCard(props: any) {
    const [error, setError] = useState("");
    const [serverToken, setServerToken] = useState<ServerToken | null>(null);
    const userJWT = AuthenticatedUser();

    function toggleTokenDisplay() {
        if (serverToken != null) {
            setServerToken(prevToken => {
                if (prevToken == null) {
                    return prevToken;
                }
                return {
                    ...prevToken,
                    show: !prevToken.show
                };
            });
        }
    }
    function copyToken() {
        navigator.clipboard.writeText(serverToken?.token as string);
    }
    return (
        <div id="userDetails" className="account-feature">
            <h2>Server Authentication</h2>
            <div className="account-feature-description">
                <p>Eco servers now require a server token to authenticate. You can generate a new token at any time, If you delete a token, any servers using that token will no longer be able to authenticate</p>
            </div>
            <div className="d-flex gap-2 py-2 w-50">
                {
                    serverToken != null ? (

                        <div className="token-wrap d-flex">
                            <input type="text" className="w-50" name="invite_code" id="invite_code" value={serverToken != null ? serverToken : "*************************"} />
                            <button title="delete token" className="btn btn-small logout-btn"><FontAwesomeIcon icon={faTrash} /></button>
                            <button title="Show Invite" onClick={toggleTokenDisplay} className="btn btn-small">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                            <button title="copy token" onClick={copyToken} className="btn btn-small">
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                    ) : (
                        <div className="token-wrap">
                            <p className='fw-bold'>You currently have no server tokens, generate one below</p>
                            <button title="Show Invite" onClick={toggleTokenDisplay} className="btn btn-small">
                                Generate server token
                            </button>
                        </div>
                    )
                }

            </div>
        </div>
    );
}
export default ServerCard
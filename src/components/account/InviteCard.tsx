import { useEffect, useState } from "react";
import { marketItem, User } from "../../types/types";
import { useGetUserInvites } from "../../utils/api";
import ModalWrapper from "../ModalWrapper";
import Payments from "./Payments";
import { AuthenticatedUser } from "../../utils/authentication";
import { InviteRedeem } from "./InviteRedeem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type Invite = {
    code: string;
    show: boolean;
}

function InviteCard({ user }: { user: User }) {
    const [purchase, setPurchase] = useState<marketItem | null>(null);
    const [userInvites, setUserInvites] = useState<Invite[]>([]);
    const { data: invites, error, isLoading } = useGetUserInvites();

    const invitePurchase: marketItem = {
        id: "eco_invite_purchase",
        name: "Eco Invites",
        sku: "eco_invite_purchase",
        price: 30.00,
        description: null
    }

    useEffect(() => {
        if (invites && invites.length > 0) {
            const formattedInvites = invites.map((invite: string) => ({
                code: invite,
                show: false
            }));
            setUserInvites(formattedInvites);
        }
    }, [invites]);

    function handlePurchaseInit(item: marketItem) {
        setPurchase(null);
        if (!AuthenticatedUser()) {
            location.href = `/login?redirect=${location.href}&error=purchase_login`;
        } else {
            setPurchase(item);
        }
    }

    function displayInvite(index: number) {
        setUserInvites(prevInvites =>
            prevInvites.map((invite, i) =>
                i === index ? { ...invite, show: !invite.show } : invite
            )
        );
    }

    function copyInvite(index: number) {
        const invite = userInvites[index];
        navigator.clipboard.writeText(invite.code);
    }
    const toggleModal = () => {
        setPurchase(null);
    };

    return (
        <div className="account-feature">
            <h2>Invites</h2>
            <div className="account-label">
                Buy Eco for your friends and send them an invite.
                <div className="btn-corner">
                    <input onClick={() => handlePurchaseInit(invitePurchase)} className="buy-invite btn btn-small" type="button" value="Get Invites" />
                </div>
                {user && user.ownsEco && userInvites.length > 0 ? (
                    <div className="account-label">
                        <p>You currently have <span className="fw-bold">{userInvites.length}</span> unused invites</p>
                        <p>Your invites:</p>
                        <ul className="gap-2 px-0 invites">
                            {userInvites.map((invite, index) => (
                                <li key={index} className="d-flex gap-2 w-100 invite-item">
                                    <input title="invite" className="w-75" type="text" value={invite.show ? invite.code : "*******************"} readOnly />
                                    <button title="Show Invite" onClick={() => displayInvite(index)} className="btn btn-small">
                                        <FontAwesomeIcon icon={invite.show ? faEyeSlash : faEye} />
                                    </button>
                                    <button title="Show Invite" onClick={() => copyInvite(index)} className="btn btn-small">
                                        <FontAwesomeIcon icon={faCopy} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>You currently have no unused invites</p>
                )}
                {user && !user.ownsEco ? <InviteRedeem /> : null}
            </div>
            {purchase && (
                <ModalWrapper toggleModal={toggleModal} dismissable={true}>
                    <Payments item={purchase} />
                </ModalWrapper>
            )}
        </div>
    );
}

export default InviteCard;
import { useState } from "react";
import { marketItem, User } from "../../types/types";
import { useGetUserInvites } from "../../utils/api";
import ModalWrapper from "../ModalWrapper";
import Payments from "./Payments";
import { AuthenticatedUser } from "../../utils/authentication";

function InviteCard({ user }: { user: User }) {
    const [purchase, setPurchase] = useState<marketItem | null>(null);
    const { data: invites, error, isLoading } = useGetUserInvites();
    const invitePurchase: marketItem = {
        id: "eco_invite_purchase",
        name: "Eco Invites",
        sku: "eco_invite_purchase",
        price: 30.00,
    }
    function handlelePurchaseInit(item: marketItem) {
        setPurchase(null);
        if (!AuthenticatedUser()) {
            location.href = `/login?redirect=${location.href}&error=purchase_login`;
        } else {
            setPurchase(item);
        }
    }
    const toggleModal = () => {
        console.log('toggleModal');
        
        setPurchase(null);
    };
    return (
        <div className="account-feature">
            <h2>Invites</h2>
            <div className="account-label">
                Buy Eco for your friends and send them an invite.
                <div className="btn-corner">
                    <input onClick={() => handlelePurchaseInit(invitePurchase)} className="buy-invite btn btn-small" type="button" value="Get Invites" />
                </div>
                {
                    invites && invites.length > 0 ? (
                        <div className="account-label">
                            <p>You currently have <span className="fw-bold">{invites?.length}</span> unused invites</p>
                            <p>Your invites:</p>
                            <ul>
                                {invites.map((invite, index) => (
                                    <li key={index}>
                                        <p>{invite.invite_code}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>You currently have no unused invites</p>
                    )
                }
            </div>
            {
                purchase != null ? (
                    <ModalWrapper toggleModal={toggleModal} dismissable={true}>
                        <Payments item={purchase} />
                    </ModalWrapper>
                ) : null
            }
        </div>
    )
}
export default InviteCard
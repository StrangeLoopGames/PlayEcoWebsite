import { useEffect, useState } from "react";
import { marketItem, User } from "../../types/types";
import { useGetUserInvites } from "../../utils/api";
import ModalWrapper from "../ModalWrapper";
import Payments from "./Payments";
import { AuthenticatedUser } from "../../utils/authentication";
import { InviteRedeem } from "./InviteRedeem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ToggleInput from "../ToggleInput";

type Invite = {
    code: string;
    show: boolean;
}

function InviteCard({ user }: { user: User }) {
    const [purchase, setPurchase] = useState<marketItem | null>(null);
    const [useCredits, setUseCredits] = useState<boolean>(false);
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
    const toggleModal = (setState: React.Dispatch<React.SetStateAction<any>>) => {
        setState(null);
    };

    function purchaseWithCredits(): void {
        setUseCredits(true);
    }

    return (
        <div className="account-feature">
            <h2>Invites</h2>
            <div className="account-label">
                Buy Eco for your friends and send them an invite.
                <div className="btn-corner">
                    <input onClick={() => handlePurchaseInit(invitePurchase)} 
                        className="buy-invite btn btn-small" type="button" 
                        value="Get Invites" 
                    />
                    {
                        user && user.ownsEco && user.ecoCredits && user.ecoCredits > 0 ? (
                            <input onClick={purchaseWithCredits} 
                            className="buy-invite btn btn-small" type="button" 
                            value="Buy with Credits" 
                        />
                        ) : null
                    }

                </div>
                {user && user.ownsEco && userInvites.length > 0 ? (
                    <div className="account-label">
                        <p>You currently have <span className="fw-bold">{userInvites.length}</span> unused invites</p>
                        <p>Your invites:</p>
                        <ul className="gap-2 px-0 invites">
                            {userInvites.map((invite, index) => (
                                <li key={index} className="d-flex gap-2 w-100 invite-item">
                                <ToggleInput key={index} code={invite.code} type={"invite"} />
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
                <ModalWrapper toggleModal={()=> toggleModal(setPurchase)} dismissable={true}>
                    <Payments item={purchase} />
                </ModalWrapper>
            )}
            { useCredits && (
                <ModalWrapper toggleModal={()=> toggleModal(setUseCredits)} dismissable={true}>
                    <PurchaseWithCredits credits={user.ecoCredits} />
                </ModalWrapper>
            )}
        </div>
    );
}
    
export function PurchaseWithCredits({credits}: {credits: number | null}) {
    const [quantity, setQuantity] = useState<number>(1);
    const item: marketItem = {
        id: "eco_invite_purchase",
        name: "Eco Invites",
        sku: "eco_invite_purchase",
        price: 3000,
        description: null
    };
    function purchaseInviteWithCredits() {
        const inviteQuantity = quantity;
        if (!AuthenticatedUser()) {
            location.href = `/login?redirect=${location.href}&error=purchase_login`;
        } else {
            console.log('purchase with credits');
        }
    }

    return (
        <>
            <h1>Buy with credits</h1>
            <h2>Eco Invites</h2>
            <p>{item.price * quantity} Credits</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button className='btn btn-quantity' onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>-</button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    style={{ margin: '0 10px' }
                }
                />
                <button className='btn btn-quantity' onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            {
                quantity > 0 && credits != null && credits >= item.price * quantity ? (
                    <button className='mt-2 btn btn-primary' onClick={purchaseInviteWithCredits}>
                    {'Buy'}
                </button>
                ) : (
                    <p className="pt-2">You do not have enough credits, you only have {credits} credits</p>
                )
            }
            {/* {error && <p>Error: {error}</p>}
            {purchaseTokenMutate.isError && (
                <p>Error: {purchaseTokenMutate.error.message}</p>
            )} */}
        </>
    );
}
export default InviteCard;
import {  useState } from 'react';
import { AuthenticatedUser } from '../../utils/authentication';
import { User } from '../../types/types';
import { Link } from '@tanstack/react-router';
import ModalWrapper from '../ModalWrapper';

type CreditTransfer = {
    userId: string;
    amount: number;
}

export function CreditsCard({ user }: { user: User | null | undefined }) {
    const [showTransfer, setShowTransfer] = useState<boolean>(false);
    const [creditTransfer, setCreditTransfer] = useState<CreditTransfer | null>(null);
    const [transferError, setTransferError] = useState<string | null>(null);
    const [confirmTransfer, setConfirmTransfer] = useState<boolean>(false);
    const userJWT = AuthenticatedUser();
    const toggleModal = () => {
        setShowTransfer(false);
        setTransferError(null);
    };
    
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setCreditTransfer({ ...creditTransfer, [name]: value } as CreditTransfer);
    }

    function handleTransfer() {
        if (!confirmTransfer) {
            setConfirmTransfer(true);
            return;
        }

        const url = `${import.meta.env.VITE_CLOUD_API_URL}Marketplace/TransferCredits?userTargetId=${creditTransfer?.userId}&amount=${creditTransfer?.amount}`;
        fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userJWT as string}`,
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((error) => {
                    setTransferError(error.message);
                    setConfirmTransfer(false);
                });
            }
            if (res.status === 200) {
                setShowTransfer(false);
                setCreditTransfer(null);
                setConfirmTransfer(false);
            }
        }).catch((error) => {
            setTransferError("An unexpected error occurred");
        });
    }

    return (
        <div id="userDetails" className="account-feature">
            <h2>Eco Credits</h2>
            <div className="account-feature-description">
                <p className="account-label-front">
                    <p>Buy Eco Credits here and spend them on premium variants inside the game!</p>
                    <p>They can also be used to buy server hosting with our exclusive partner 4Netplayers! </p>
                </p>
                <span className="account-label-front">Eco Credits Balance:</span>{user != null ? user.ecoCredits : 0}
            </div>
            <div className="btn-corner">
                <Link className="btn btn-small" to="/buy">Buy Eco Credits</Link>
                <Link className="btn btn-small" to="/hosting">Buy Hosting</Link>
                <button onClick={() => setShowTransfer(!showTransfer)} className="btn btn-small">Transfer Credits</button>
            </div>
            {showTransfer ? (
                <ModalWrapper toggleModal={toggleModal} dismissable={true}>
                    <div className="account-feature-description d-flex flex-column w-100 gap-2">
                        <h1>Transfer Credits</h1>
                        <p className='text-center'>Transfer Credits to another user <br />
                            <span className='text-danger fw-bold'>Be aware of who you are sending credits to!</span>
                        </p>
                        <label className='d-flex flex-column w-100' htmlFor="userID">
                            <span>User ID:</span>
                            <input type="text" name="userId" onChange={handleInputChange} placeholder="User ID" />
                        </label>
                        <label className='d-flex flex-column w-100' htmlFor="amount">
                            <span>Amount:</span>
                            <input type="number" name="amount" onChange={handleInputChange} placeholder="Amount" />
                        </label>
                        {transferError && <p className="alert alert-danger">{transferError}</p>}
                        <button onClick={handleTransfer} className="btn btn-primary mt-3" disabled={creditTransfer && user?.ecoCredits && user.ecoCredits >= creditTransfer.amount ? false : true}>
                        {confirmTransfer ? "Click again to confirm" : "Transfer"}
                        </button>
                    </div>
                </ModalWrapper>
            ) : null}
        </div>
    );
}
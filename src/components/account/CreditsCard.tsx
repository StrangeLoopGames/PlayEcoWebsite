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
                        <p className='text-center fw-bold'>Transfer Credits to another user <br />
                            <span className='text-danger'>Be aware of who you are sending credits to!</span> 
                            <br />
                            <span className='fw-normal fs-6'>* When transfering credits, a 10% tax is applied which will be split among modders, hosts, streamers, charity, and SLG based on the last server you played on.</span>
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
                        {
                            creditTransfer != null ? (
                                <div className='transfer-details d-flex gap-2'>
                                    <p className="alert alert-warning col-6">
                                        <h5 className='fw-bold fs-6'>You:</h5>
                                        <span className='fw-bold'>{creditTransfer.amount} Credits</span> Will be deducted from your account
                                    </p>
                                    <p className="alert alert-info col-6">
                                        <h5 className='fw-bold fs-6'>User: {creditTransfer.userId}</h5>
                                        {/* display amount minus 10% */}
                                        will recieve <span className="fw-bold">{creditTransfer.amount - (creditTransfer.amount * 0.1)} Credits</span> after  10% tax <span className='fw-bold'>({creditTransfer.amount * 0.1} Credits)</span>
                                    </p>
                                </div>
                            ) : null
                        }
                        <button onClick={handleTransfer} className="btn btn-primary mt-3" disabled={creditTransfer && user?.ecoCredits && user.ecoCredits >= creditTransfer.amount ? false : true}>
                        {confirmTransfer ? "Click again to confirm" : "Transfer"}
                        </button>
                    </div>
                </ModalWrapper>
            ) : null}
        </div>
    );
}
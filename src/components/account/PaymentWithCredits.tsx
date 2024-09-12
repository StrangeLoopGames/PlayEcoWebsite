import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { AuthenticatedUser } from '../../utils/authentication';
import { useEffect, useState } from 'react';
import { hostingVoucher } from "../../types/types";
import ToggleInput from '../ToggleInput';

export function PaymentWithCredits({ item }: { item: hostingVoucher }) {
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);

    const paymentWithCreditsMutate = useMutation({
        mutationFn: async (object: {type: string, amount: number}) => {
            let url;
            switch (object.type) {
                case 'credits':
                    url = `${import.meta.env.VITE_CLOUD_API_URL}Invites/BuyInvitesWithCredits?count=${object.amount}`;
                    break;
                case 'voucher':
                    url = `${import.meta.env.VITE_CLOUD_API_URL}Marketplace/BuyThirdPartyHosting?amount=${object.amount}`;
                    break;
                default:
                    throw new Error('Invalid payment type');
            }
            const response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${AuthenticatedUser()}`,
                    },
                }
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Network response was not ok');
            }

            const token = await response.text();
            return token;
        },
        onSuccess: (token) => {
            setResponse(token);
        },
        onError: (error: any) => {
            setError(error.message);
        }
    });
    
    function handleVoucherPurchase() {
        paymentWithCreditsMutate.mutate({type: 'voucher', amount: item.credits});
    }
    return (
        <>
            <h1>Buy with credits</h1>
            <h2>{item.name}</h2>
            {
                response == null ? (
                    <>
                        <p>{item.description}</p>
                        <p>Cost: {item.credits} Eco Credits</p>
                        <button className='mt-2 btn btn-primary' onClick={handleVoucherPurchase} disabled={paymentWithCreditsMutate.isPending}>
                            {paymentWithCreditsMutate.isPending ? 'Processing...' : 'Buy'}
                        </button>
                    </>
                ) : null
            }
            {error && <p className='alert alert-danger col-12 mt-2'>{error}</p>}
            {
                response && (
                    <div class="d-flex flex-column col-11">
                    <p className="alert alert-success w-100">
                        You have succesfully purchase a voucher <br />
                        Your voucher code has also been emailed to you.
                        </p>
                    <p>Your voucher code is</p>
                    <ToggleInput code={response} type={"voucher"} />
                    <a href="https://www.4netplayers.com/" target="_blank" className='mt-4 btn btn-primary' title='Redeem Voucher'>
                        Redeem Voucher
                    </a>
                    </div>
                )
            }
        </>
    );
}
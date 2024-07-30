import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { AuthenticatedUser } from '../../utils/authentication';
import { useEffect, useState } from 'react';

type PaymentObject = {
    item: string;
    quantity: number | null | undefined;
};

function Payments() {
    const [paymentToken, setPaymentToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const purchaseTokenMutate = useMutation({
        mutationFn: async (object: PaymentObject) => {
            const response = await fetch(
                `${import.meta.env.VITE_CLOUD_API_URL}Transactions/GenerateXsollaToken`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${AuthenticatedUser()}`,
                    },
                    body: JSON.stringify(object),
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.token;
        },
        onSuccess: (data) => {
            setPaymentToken(data);
        },
        onError: (error: any) => {
            setError(error.message);
        }
    });

    function initPurchaseAndToken() {
        const paymentRequest = {
            item: 'game_purchase',
            quantity: 1,
        };
        purchaseTokenMutate.mutate(paymentRequest);
    }

    useEffect(() => {
        if (paymentToken) {
            window.XPayStationWidget.init({
                sandbox: true,
                access_token: paymentToken,
            });
            window.XPayStationWidget.open();
        }
    }, [paymentToken]);

    return (
        <div>
            <h1>Payments</h1>
            <button onClick={initPurchaseAndToken}>
                {purchaseTokenMutate.isLoading ? 'Processing...' : 'Pay with Xsolla'}
            </button>
            {error && <p>Error: {error}</p>}
            {purchaseTokenMutate.isError && (
                <p>Error: {purchaseTokenMutate.error.message}</p>
            )}
            {purchaseTokenMutate.isSuccess && paymentToken ? (
                <>
                    <p>Success: {purchaseTokenMutate.data}</p>
                    <p>{paymentToken}</p>
                </>
            ) : null}
            {paymentToken && (
                <a href={`https://sandbox-secure.xsolla.com/paystation4/?token=${paymentToken}`}></a>
            )}
        </div>
    );
}

export default Payments;

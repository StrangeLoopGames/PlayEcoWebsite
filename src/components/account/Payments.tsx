import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { AuthenticatedUser } from '../../utils/authentication';
import { useEffect, useState } from 'react';

type PaymentObject = {
    item: string | null | undefined;
    quantity: number | null | undefined;
};
type marketItem = {
    id: string,
    sku: string,
    name: string,
    price: number,
}

function Payments({ item }: { item: marketItem }) {
    const [paymentToken, setPaymentToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [paymentObject, setPaymentObject] = useState<PaymentObject | null>({
        item: item.sku,
        quantity: quantity,
    });
    const [isXsollaInitiated, setIsXsollaInitiated] = useState<boolean>(false);

    const purchaseTokenMutate = useMutation({
        mutationFn: async (object: PaymentObject) => {
            const response = await fetch(
                `${import.meta.env.VITE_CLOUD_API_URL}Transactions/GeneratePaymentToken`,
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
        if (paymentObject != null) {
            setIsXsollaInitiated(true);
            purchaseTokenMutate.mutate(paymentObject);
        }
    }
    const paymentSandbox = import.meta.env.VITE_PAYMENT_SANDBOX == 'true';
    useEffect(() => {
        if (quantity) {
            setPaymentObject({ item: item.sku, quantity: quantity ? quantity : 1 });
        }
        if (paymentToken) {
            window.XPayStationWidget.init({
                sandbox: paymentSandbox,
                access_token: paymentToken,
                childWindow: {
                    target: '_parent',
                },
                onPaymentSuccess: function (data: any) {
                    console.log(data);
                },
                onPaymentFailure: function (data: any) {
                    console.log(data);
                },
                onPaymentCancel: function (data: any) {
                    console.log(data);
                },
                onPaymentClose: function (data: any) {
                    console.log(data);
                    setIsXsollaInitiated(false); // Reset the state when the widget is closed
                },
            });
            window.XPayStationWidget.open();
        }
    }, [paymentToken, quantity]);

    window.XPayStationWidget.on('close', function (data: any) {
        console.log("closed");
        setIsXsollaInitiated(false); // Reset the state when the widget is closed
    });

    const isGamePurchase = item.sku === 'game_eco_purchase';

    return (
        <>
            <h1>Purchase</h1>
            <h2>{item.name}</h2>
            <p>${item.price * quantity}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button className='btn btn-quantity' onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)} disabled={isGamePurchase}>-</button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    style={{ margin: '0 10px' }}
                    disabled={isGamePurchase}
                />
                <button className='btn btn-quantity' onClick={() => setQuantity(quantity + 1)} disabled={isGamePurchase}>+</button>
            </div>
            <button className='mt-2 btn btn-primary' onClick={initPurchaseAndToken} disabled={isXsollaInitiated || purchaseTokenMutate.isLoading}>
                {isXsollaInitiated || purchaseTokenMutate.isLoading ? 'Processing...' : 'Buy'}
            </button>
            {error && <p>Error: {error}</p>}
            {purchaseTokenMutate.isError && (
                <p>Error: {purchaseTokenMutate.error.message}</p>
            )}
        </>
    );
}

export default Payments;
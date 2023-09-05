import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import { PROCESS_PAYMENT } from '../graphQL/mutations';

function CheckoutForm({ totalAmount, cartItems, onClose }) {
    const stripe = useStripe();
    const elements = useElements();
    const [processPayment] = useMutation(PROCESS_PAYMENT);

    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[ERROR]', error);
            setFeedback('Payment failed. Please check your card details.');
        } else {
            processPayment({
                variables: {
                    paymentMethodId: paymentMethod.id,
                    amount: parseFloat(totalAmount) * 100,
                }
            })
            .then(response => {
                if (response.data.processStripePayment.success) {
                    console.log('[PaymentMethod]', paymentMethod);
                    setFeedback('Payment successful!');
                    onClose(); // This closes the checkout modal
                } else {
                    setFeedback(response.data.processStripePayment.message || 'Payment failed. Please try again.');
                }
            })
            .catch(err => {
                console.error(err);
                setFeedback('Payment failed. Please try again.');
            });
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-md"></div> {/* Background overlay with increased blur */}
            
            <div className="bg-white p-8 w-11/12 md:max-w-2xl mx-auto rounded-lg shadow-2xl z-10">
                <h2 className="text-3xl font-bold font-gamja mb-6">Complete Your Purchase</h2>
                <p className="mb-6 text-xl text-gray-600 font-tinkle">Total: ${totalAmount}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <CardElement className="p-3 border rounded"/>
                    <button type="submit" 
                            disabled={!stripe || feedback === 'Payment successful!'} 
                            className="bg-indigo-600 text-white w-full py-3 rounded hover:bg-indigo-500 focus:outline-none font-tinkle">
                        Purchase Order
                    </button>
                </form>
                {feedback && <p className="mt-6 text-red-600 font-tinkle">{feedback}</p>}

                <button onClick={onClose} className="mt-6 text-indigo-600 hover:text-indigo-500 focus:outline-none font-tinkle">
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default CheckoutForm;

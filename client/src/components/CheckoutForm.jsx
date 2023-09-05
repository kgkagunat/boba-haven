import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { empty, useMutation } from '@apollo/client';
import { PROCESS_PAYMENT, LOG_ORDER_TO_USER_HISTORY } from '../graphQL/mutations';

function CheckoutForm({ totalAmount, cartItems, onClose }) {
    const stripe = useStripe();
    const elements = useElements();
    const [processPayment] = useMutation(PROCESS_PAYMENT);
    const [logOrder] = useMutation(LOG_ORDER_TO_USER_HISTORY);

    const [feedback, setFeedback] = useState('');
    const [userId, setUserId] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
        setOrderId(localStorage.getItem('currentOrderId'));
    }, []); // Run only once, during component mount

    const emptyCart = () => {
        localStorage.removeItem('cart');
    };

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
                    setPaymentSuccessful(true);

                    logOrder({
                        variables: {
                            userId: userId,
                            orderId: orderId
                        }
                    }).then(() => {
                        console.log("Log order response:", response);
                        emptyCart();
                    }).catch(err => {
                        console.error("Failed to log order:", err);
                        console.error("Sent userId:", userId);
                        console.error("Sent orderId:", orderId);
                    });

                    setFeedback('Payment successful!');
                    // onClose();
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
            <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-md"></div> 
            <div className="bg-white p-8 w-11/12 md:max-w-2xl mx-auto rounded-lg shadow-2xl z-10">
                {paymentSuccessful && (
                    <div className="text-center">
                        <span role="img" aria-label="checkmark" className="text-green-500 text-4xl">✅</span>
                        <p className="text-2xl font-bold text-green-500 mt-4">Payment Successful!</p>
                    </div>
                )}
                <h2 className="text-3xl font-bold font-gamja mb-6">Complete Your Purchase</h2>
                <p className="mb-6 text-xl text-gray-600 font-tinkle">Total: ${totalAmount}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <CardElement className="p-3 border rounded"/>
                    {paymentSuccessful ? (
                        <Link to="/">
                            <button className="bg-green-500 hover:bg-green-400 text-white w-full py-3 rounded focus:outline-none font-tinkle">
                                Return to Home
                            </button>
                        </Link>
                    ) : (
                        <button type="submit" 
                                disabled={!stripe} 
                                className="bg-indigo-600 text-white w-full py-3 rounded hover:bg-indigo-500 focus:outline-none font-tinkle">
                            Purchase Order
                        </button>
                    )}
                </form>
                
                {feedback && !paymentSuccessful && <p className="mt-6 text-red-600 font-tinkle">{feedback}</p>}

                {!paymentSuccessful && (
                    <button onClick={onClose} className="mt-6 text-indigo-600 hover:text-indigo-500 focus:outline-none font-tinkle">
                        Go Back
                    </button>
                )}
            </div>
        </div>
    );
}

export default CheckoutForm;

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
                    setFeedback('Payment successful!');
                    emptyCart(); // Clear the cart after successful payment
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
            <div className="bg-gradient-to-b from-white to-pink-200 p-8 w-11/12 md:max-w-2xl mx-auto rounded-lg shadow-2xl z-10">
                {paymentSuccessful && (
                    <div className="text-center">
                        <span role="img" aria-label="checkmark" className="text-green-600 text-2xl">✅</span>
                        <p className="font-twinkle text-3xl font-bold text-green-600 mt-4 mb-10">Payment Successful!</p>
                    </div>
                )}
                <h2 className="text-3xl font-bold font-gamja mb-6">Complete Your Purchase</h2>
                <p className="font-gamja mb-6 text-3xl text-gray-600 font-tinkle">Total: ${totalAmount}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <CardElement className="text-black m-3 p-3 border rounded border-black"/>
                    {paymentSuccessful ? (
                        <Link to="/">
                            <button className="font-gamja text-2xl mt-7 bg-green-500 hover:bg-green-400 text-white hover:text-black w-full py-3 rounded focus:outline-none">
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

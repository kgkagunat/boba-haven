import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import purpleFlowerFrame from '../assets/images/purple_flower_frame_pngwing.png';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_DRINK_FROM_ORDER, UPDATE_DRINK_QUANTITY_IN_ORDER, UPDATE_DRINK_SIZE_IN_ORDER } from '../graphQL/mutations';
import { GET_ME } from '../graphQL/queries';

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm"; // You will create this component later.

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Initialize state
  const initialState = {
    currentOrderId: '',
    drinkId: '',
    newQuantity: 1,
  };
  
  const [state, setState] = useState(initialState);

  const { data } = useQuery(GET_ME);
  const [removeDrink] = useMutation(REMOVE_DRINK_FROM_ORDER);
  const [updateDrinkQuantity] = useMutation(UPDATE_DRINK_QUANTITY_IN_ORDER);
  const [updateDrinkSize] = useMutation(UPDATE_DRINK_SIZE_IN_ORDER);

  const handleCloseModal = () => {
    setShowCheckoutModal(false);
};

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, [data]);

  const removeFromCart = async (drinkId, orderId, drinkName, drinkSize) => {
    const updatedCart = cartItems.filter(item => !(item.name === drinkName && item.size === drinkSize));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    try {
      await removeDrink({
        variables: {
          removeDrinkFromOrderOrderId2: orderId,
          removeDrinkFromOrderDrinkId2: drinkId
        }
      });
    } catch (error) {
      console.error("Failed to remove drink from order:", error);
    }
  };

  const handleDrinkQuantityChange = async (drinkId, orderId, event) => {
    const newQuantity = parseInt(event.target.value);

    // Update UI and local storage first
    const updatedCartItems = cartItems.map(item => {
      if (item.id === drinkId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));

    // Then update in the backend
    changeDrinkQuantity(drinkId, orderId, newQuantity);
  };

  const changeDrinkQuantity = async (drinkId, orderId, newQuantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === drinkId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    try {
      await updateDrinkQuantity({
        variables: {
          updateDrinkQuantityInOrderOrderId: orderId,
          updateDrinkQuantityInOrderDrinkId: drinkId,
          newQuantity
        }
      });
    } catch (error) {
      console.error("Failed to update drink quantity:", error);
    }
  };

  const handleDrinkSizeChange = async (drinkId, orderId, event) => {
    const newSize = event.target.value;
    changeDrinkSize(drinkId, orderId, newSize);
  };

  const changeDrinkSize = async (drinkId, orderId, newSize) => {
    try {
      await updateDrinkSize({
        variables: {
          updateDrinkSizeInOrderOrderId: orderId,
          updateDrinkSizeInOrderDrinkId: drinkId,
          newSize
        }
      });
    } catch (error) {
      console.error("Failed to update drink size:", error);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

  return (
    <div className="min-h-screen min-w-screen justify-center bg-gradient-to-r from-white to-purple-400">

      <img src={purpleFlowerFrame} alt="purple flower frame png from pngwing.com" className="absolute w-screen h-screen z-5 opacity-5 pointer-events-none" />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="font-twinkle text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Orders</h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">Your drink orders</h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cartItems.map((drink) => (
                <li key={drink.name} className="flex py-6">
                  <div className="flex-shrink-0">
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a href={drink.href} className="font-gamja text-3xl text-gray-700 hover:text-gray-800">
                            {drink.name}
                          </a>
                        </h4>
                        <p className="ml-4 font-gamja text-3xl text-gray-900">${drink.price}</p>
                      </div>
                      <p className="mt-3 font-gamja text-2xl text-gray-500">Size: {drink.size}
                    </p>
                    <p className="mt-3 font-gamja text-2xl text-gray-500">Quantity: {drink.quantity}
                    </p>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <div className="ml-4">
                        <button 
                          type="button" 
                          onClick={() => removeFromCart(drink.drinkId, drink.orderId, drink.name, drink.size)}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">Order summary</h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between font-gamja">
                  <dt className="text-4xl text-gray-900">Subtotal</dt>
                  <dd className="text-4xl ml-4 text-gray-900">${subtotal}</dd>
                </div>
              </dl>
              <p className="mt-1 font-gamja text-xl text-gray-500">Shipping and taxes will be calculated at checkout.</p>
            </div>

            <div className="font-gamja text-xl mt-6 text-center">
            <div className="hover:underline">
                <Link to="/" className="font-gamja text-2xl mt-5 text-indigo-600 hover:text-indigo-500">
                  Continue order / back to drinks
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>

              <p className='m-4'>or</p>

              <button onClick={() => setShowCheckoutModal(true)} type='button' className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full">
                Checkout
              </button>
              
            </div>
          </section>
        </form>
        {showCheckoutModal && (
        <div className="modal-background">
          <div className="modal-content">
            <button onClick={() => setShowCheckoutModal(false)}>Close</button>
            <Elements stripe={stripePromise}>
                <CheckoutForm totalAmount={subtotal} cartItems={cartItems} onClose={handleCloseModal} />
            </Elements>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Cart;

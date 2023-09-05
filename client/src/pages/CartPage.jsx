import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import purpleFlowerFrame from '../assets/images/purple_flower_frame_pngwing.png';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_DRINK_FROM_ORDER, UPDATE_DRINK_QUANTITY_IN_ORDER, UPDATE_DRINK_SIZE_IN_ORDER } from '../graphQL/mutations';
import { GET_ME } from '../graphQL/queries';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

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

  const handleDrinkQuantityChange = async (drinkId, event) => {
    const newQuantity = parseInt(event.target.value);

    console.log("Drink ID:", drinkId);
    console.log("New Quantity:", newQuantity);

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
    changeDrinkQuantity(drinkId, newQuantity);
  };

  const changeDrinkQuantity = async (drinkId, newQuantity) => {
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
          updateDrinkQuantityInOrderOrderId: state.currentOrderId,
          updateDrinkQuantityInOrderDrinkId: state.drinkId,
          newQuantity
        }
      });
    } catch (error) {
      console.error("Failed to update drink quantity:", error);
    }
  };

  const handleDrinkSizeChange = async (drinkId, event) => {
    const newSize = event.target.value;
    changeDrinkSize(drinkId, newSize);
  };

  const changeDrinkSize = async (drinkId, newSize) => {
    try {
      await updateDrinkSize({
        variables: {
          updateDrinkSizeInOrderOrderId: 'YOUR_ORDER_ID',
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

            <div className="mt-10">
              <Link to="/checkout">
                <button
                  type="button"
                  className="font-gamja text-2xl w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </Link>
            </div>

            <div className="font-gamja text-xl mt-6 text-center">
              <p>or</p>
              <div className="hover:underline">
                <Link to="/" className="font-gamja text-2xl mt-5 text-indigo-600 hover:text-indigo-500">
                  Continue order / back to drinks
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Cart;

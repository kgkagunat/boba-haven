import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_DRINK } from '../graphQL/queries';
import { ADD_ORDER, ADD_DRINK_TO_EXISTING_ORDER } from '../graphQL/mutations';
import atmosBlue from '../assets/images/atmos_blue_pngwing.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../utils/auth';

const DrinksPage = () => {
    const { id } = useParams();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [drinkSize, setDrinkSize] = useState({ size: "medium", price: 0 });

    // Initialize currentOrderId from local storage
    const [currentOrderId, setCurrentOrderId] = useState(localStorage.getItem('currentOrderId'));

    const { data, loading, error } = useQuery(GET_DRINK, { variables: { drinkId: id } });
    const { data: userData, userLoading, userError } = useQuery(GET_ME);
    const [addOrder] = useMutation(ADD_ORDER);
    const [addDrinkToExistingOrder] = useMutation(ADD_DRINK_TO_EXISTING_ORDER);
    const selectedDrink = data?.drink;

    useEffect(() => {
    }, [currentOrderId]);

    const handleSizeChange = (size, price) => {
        setDrinkSize({ size, price });
    };

    const handleAddToCart = async () => {
        if (!AuthService.loggedIn()) {
            setFeedbackMessage("Please log in to add items to the cart.");
            return;
        }
        try {
            if (currentOrderId) {
                localStorage.setItem('currentOrderId', currentOrderId);
                await addDrinkToExistingOrder({
                    variables: {
                        orderId: currentOrderId,
                        addDrinkToExistingOrderDrinkId: selectedDrink._id,
                        quantity: 1,
                        size: drinkSize.size
                    },
                    update: (cache, { data: { addDrinkToExistingOrder } }) => {
                        const userData = cache.readQuery({ query: GET_ME });
                        if (userData) {
                            const updatedUser = {
                                ...userData.me,
                                orders: userData.me.orders.map(order => 
                                    order._id === addDrinkToExistingOrder._id ? addDrinkToExistingOrder : order
                                )
                            };
                            cache.writeQuery({
                                query: GET_ME,
                                data: { me: updatedUser }
                            });
                        }
                    }
                });
            } else {
                const newOrderResponse = await addOrder({
                    variables: {
                        drinks: [{
                            drinkId: selectedDrink._id,
                            quantity: 1,
                            size: drinkSize.size
                        }]
                    },
                    update: (cache, { data: { addOrder } }) => {
                        const userData = cache.readQuery({ query: GET_ME });
                        if (userData) {
                            const updatedUser = {
                                ...userData.me,
                                orders: [...userData.me.orders, addOrder]
                            };
                            cache.writeQuery({
                                query: GET_ME,
                                data: { me: updatedUser }
                            });
                        }
                    }
                });
                if (newOrderResponse.data && newOrderResponse.data.addOrder) {
                    setCurrentOrderId(newOrderResponse.data.addOrder._id); 
                    localStorage.setItem('currentOrderId', newOrderResponse.data.addOrder._id); 
                }
            }
            updateLocalCart(selectedDrink);
        } catch (error) {
            console.error("Error adding to cart:", error);
            setFeedbackMessage("Error adding to cart. Please try again.");
        }
        setTimeout(() => setFeedbackMessage(""), 2000);
    };

    const updateLocalCart = (selectedDrink) => {
        const cartItem = {
            name: selectedDrink.name,
            size: drinkSize.size,
            price: drinkSize.price,
            quantity: 1,
            orderId: currentOrderId,
            drinkId: selectedDrink._id
        };
        const cart = JSON.parse(localStorage.getItem('cart') || "[]");
        const existingItemIndex = cart.findIndex(item => 
            item.name === cartItem.name && 
            item.size === cartItem.size && 
            item.orderId === cartItem.orderId
        );
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(cartItem);
        }
        cartItem.orderId = currentOrderId || localStorage.getItem('currentOrderId'); // Fetching from state or LocalStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        setFeedbackMessage("Item added to cart!");
    };

    if (userLoading || loading) return <p>Loading...</p>;
    if (userError) return <p>Error: {userError.message}</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="bg-radial-gradient-white-pink flex justify-center items-center h-screen z-0">
            <img src={atmosBlue} alt="blue atmosphere" className="absolute w-screen h-screen z-5 opacity-20 pointer-events-none" />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {/* Drink Details */}
                <div className="lg:max-w-lg lg:self-end">
                    <h1 className="font-twinkle text-3xl font-bold tracking-tight text-black sm:text-4xl">{selectedDrink?.name}</h1>
                    <p className="font-gamja text-2xl text-gray-500 mt-4">{selectedDrink?.description}</p>
                    <div className="mt-6 flex items-center">
                        {["small", "medium", "large"].map(size => (
                            <button 
                                key={size}
                                type="button" 
                                onClick={() => handleSizeChange(size, selectedDrink?.prices[size])}
                                className="font-gamja text-2xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-700 dark:hover:bg-zinc-800 focus:outline-none dark:focus:ring-pink-500"
                            >
                                {size.charAt(0).toUpperCase() + size.slice(1)} ${selectedDrink?.prices[size]}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Drink Image */}
                <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                        <img src={selectedDrink?.image} alt={selectedDrink?.name} className="h-full w-full object-cover object-center z-0" />
                    </div>
                </div>
                {/* Cart Operations */}
                <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                    {feedbackMessage && <p className="font-gamja flex items-center justify-center text-3xl text-bold text-pink-600">{feedbackMessage}</p>}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="font-gamja text-3xl flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-700 px-3 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                        Add to cart
                    </button>
                    <div className="font-gamja flex justify-center text-xl mt-6 transform transition-transform duration-200 hover:text-pink-400 hover:scale-110">
                        <Link to="/">
                            Go back home / drinks menu 
                            <FontAwesomeIcon icon={faHome} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrinksPage;

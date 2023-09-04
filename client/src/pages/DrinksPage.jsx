import { React, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_DRINK } from '../graphQL/queries';
import { useMutation } from '@apollo/client';
import { ADD_ORDER, ADD_DRINK_TO_EXISTING_ORDER } from '../graphQL/mutations';
import atmosBlue from '../assets/images/atmos_blue_pngwing.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../utils/auth';


const DrinksPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const { data, loading, error } = useQuery(GET_DRINK, {
        variables: { drinkId: id }
    });
    const { data: userData } = useQuery(GET_ME);

    const [addOrder] = useMutation(ADD_ORDER);
    const [addDrinkToExistingOrder] = useMutation(ADD_DRINK_TO_EXISTING_ORDER);

    const currentOrder = userData?.me?.orders?.[0];  // assuming the latest order is the first one

    const selectedDrink = data ? data.drink : null;
    const initialSize = {
        size: "medium",
        price: selectedDrink?.prices.medium || 0
    };
    const [drinkSize, setDrinkSize] = useState(initialSize);

    const sizeChange = (size, price) => {
        setDrinkSize({ size, price });
    }

    const addToCart = async () => {
        if (!AuthService.loggedIn()) {
            setFeedbackMessage("Please log in to add items to the cart.");
            return;
        }
    
        const orderDrinks = [{
            drinkId: selectedDrink._id,
            quantity: 1,
            size: drinkSize.size,
        }];
    
        let orderId = "";  // To store the order id
        
        try {
            if (currentOrder && !currentOrder.purchaseDate) {  // Check if there's an open order
                const { data } = await addDrinkToExistingOrder({ 
                    variables: { 
                        orderId: currentOrder._id, 
                        addDrinkToExistingOrderDrinkId: selectedDrink._id,
                        quantity: 1,
                        size: drinkSize.size
                    } 
                });
                orderId = currentOrder._id;
            } else {
                const { data } = await addOrder({ variables: { drinks: orderDrinks } });
                orderId = data.addOrder._id;
            }
    
            if (orderId) {
                let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
                const currentIndex = currentCart.findIndex(item => item.name === selectedDrink.name && item.size === drinkSize.size);
    
                if (currentIndex !== -1) {
                    currentCart[currentIndex].quantity += 1;
                } else {
                    const currentDrink = {
                        name: selectedDrink.name,
                        size: drinkSize.size,
                        price: drinkSize.price,
                        quantity: 1,
                        orderId  // Store order id with the drink
                    }
                    currentCart.push(currentDrink);
                }
    
                localStorage.setItem('cart', JSON.stringify(currentCart));
                setFeedbackMessage("Item added to cart!");
            }
        } catch (err) {
            console.error("Error adding order:", err);
            setFeedbackMessage("Error adding to cart. Please try again.");
        }
    
        setTimeout(() => setFeedbackMessage(""), 2000);
    };
    

    if (!selectedDrink) {
        return null;
    }

    return (
        <div className="bg-radial-gradient-white-pink flex justify-center items-center h-screen z-0">

        {/* SVG Overlay */}
        <img src={atmosBlue} loading="lazy" alt="blue atmosphere png from pngwing.com" className="absolute w-screen h-screen z-5 opacity-20 pointer-events-none" />

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:max-w-lg lg:self-end">

                    {/* Drink Name */}
                    <h1 className="font-twinkle text-3xl font-bold tracking-tight text-black sm:text-4xl">{selectedDrink?.name}</h1>
                    <section aria-labelledby="information-heading" className="mt-4">

                        {/* Drink Description */}
                        <div className="mt-4 space-y-6">
                            <p className="font-gamja text-2xl text-gray-500">{selectedDrink?.description}</p>
                        </div>

                        <div className="mt-6 flex items-center">
                        <button 
                            type="button" 
                            onClick={() => sizeChange("small", selectedDrink?.prices.small)}
                            className="font-gamja text-2xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Small {selectedDrink?.prices.small}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => sizeChange("medium", selectedDrink?.prices.medium)}
                            className="font-gamja text-2xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Medium {selectedDrink?.prices.medium}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => sizeChange("large", selectedDrink?.prices.large)}
                            className="font-gamja text-2xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Large {selectedDrink?.prices.large}
                        </button>
                        </div>
                    </section>
                </div>
                <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">

                    {/* Drink Image */}
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                        <img src={selectedDrink.image} alt={selectedDrink.name} className="h-full w-full object-cover object-center z-0" />
                    </div>

                </div>
                <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                    <section aria-labelledby="options-heading">
                        <form>
                        <div className="mt-10">
                        {feedbackMessage && <p className="font-gamja flex items-center justify-center text-3xl text-bold text-pink-600">{feedbackMessage}</p>}
                            <button
                                type="button"
                                onClick={addToCart}
                                className="font-gamja text-3xl flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Add to cart
                            </button>
                        </div>
                        </form>
                    </section>
                    <div className="font-gamja flex justify-center text-xl mt-4 transform transition-transform duration-200 hover:text-pink-400 hover:scale-110">
                    <Link to="/" className="mt-5">
                        Click me to go back home / drinks menu 
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
};

export default DrinksPage;

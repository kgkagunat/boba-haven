import React from 'react';
import { useDrinkState } from '../utils/DrinkContext';
import { useNavigate } from 'react-router-dom';
import atmosBlue from '../assets/images/atmos_blue_pngwing.png';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


const DrinksPage = () => {
    const { selectedDrink } = useDrinkState();
    const navigate = useNavigate();

    if (!selectedDrink) {
        navigate.push('/404');
        return null; // Return null since we're redirecting to another page
    }

    return (
        <div className="bg-radial-gradient-white-pink flex justify-center items-center h-screen z-0">

        {/* SVG Overlay */}
        <img src={atmosBlue} loading="lazy" alt="blue atmosphere png from pngwing.com" className="absolute w-screen h-screen z-5 opacity-20 pointer-events-none" />

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:max-w-lg lg:self-end">

                    {/* Drink Name */}
                    <h1 className="font-twinkle text-3xl font-bold tracking-tight text-black sm:text-4xl">{selectedDrink.name}</h1>
                    <section aria-labelledby="information-heading" className="mt-4">

                        {/* Drink Price */}
                        <p className="font-gamja text-2xl text-black">{selectedDrink.price}</p>

                        {/* Drink Description */}
                        <div className="mt-4 space-y-6">
                            <p className="font-gamja text-2xl text-gray-500">{selectedDrink.description}</p>
                        </div>

                        <div className="mt-6 flex items-center">
                            <p className="font-gamja text-xl ml-2 text-gray-500">Calories</p>
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
                            <div className="sm:flex sm:justify-between"></div>
                            <div className="mt-4"></div>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="font-gamja text-3xl flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </form>
                    </section>
                    <div className="font-gamja flex justify-center text-xl mt-4 hover:text-pink-400 hover:scale-110">
                    <Link to="/" className="">
                        Click me to go back home 
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
};

export default DrinksPage;

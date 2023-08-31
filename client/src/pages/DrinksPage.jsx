import React from 'react';
import { useDrinkState } from '../utils/DrinkContext';

const DrinksPage = () => {
    const { selectedDrink } = useDrinkState();

    if (!selectedDrink) {
        return <div>Drink not found!</div>;
    }

    return (
        <div className="bg-white flex justify-center items-center h-screen">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:max-w-lg lg:self-end">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{selectedDrink.name}</h1>
                    <section aria-labelledby="information-heading" className="mt-4">
                        <p className="text-lg text-gray-900 sm:text-xl">{selectedDrink.price}</p>
                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-500">{selectedDrink.description}</p>
                        </div>
                        <div className="mt-6 flex items-center">
                            <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                        </div>
                    </section>
                </div>
                <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                        <img src={selectedDrink.image} alt={selectedDrink.name} className="h-full w-full object-cover object-center" />
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
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DrinksPage;

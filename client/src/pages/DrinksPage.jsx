import React from 'react';
import { useDrinkState } from '../utils/DrinkContext';

const DrinksPage = () => {
    const { selectedDrink } = useDrinkState();

    if (!selectedDrink) {
        return <div>Drink not found!</div>;
    }

    const { name, description, image, price } = selectedDrink;

    return (
        <div>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price}</p>
        </div>
    );
};

export default DrinksPage;

import React, { createContext, useReducer, useContext } from 'react';
import drinkReducer from './drinkReducer';

const DrinkStateContext = createContext();
const DrinkDispatchContext = createContext();

export const DrinkProvider = ({ children }) => {
    const [state, dispatch] = useReducer(drinkReducer, {
        selectedDrink: null
    });

    return (
        <DrinkStateContext.Provider value={state}>
            <DrinkDispatchContext.Provider value={dispatch}>
                {children}
            </DrinkDispatchContext.Provider>
        </DrinkStateContext.Provider>
    );
};

export const useDrinkState = () => {
    return useContext(DrinkStateContext);
};

export const useDrinkDispatch = () => {
    return useContext(DrinkDispatchContext);
};

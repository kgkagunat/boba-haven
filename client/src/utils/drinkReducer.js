export const ACTIONS = {
    SET_SELECTED_DRINK: 'set-selected-drink'
};

const drinkReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_SELECTED_DRINK:
            return { ...state, selectedDrink: action.payload };
        default:
            return state;
    }
};

export default drinkReducer;

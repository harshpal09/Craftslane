import { ADD_ITEM, REMOVE_ITEM, WISHLIST_ITEM, CHECK_TOKEN } from "./ActionTypes";

const initialState = {
    tokenAvailable: false,
    checkToken: false,
    wishlistCount:0,
    cartCount:0
}

export const Reducers = (state = initialState, action) => {
    // console.log("On Reducers state => ",state," action => ",action);
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                cartCount: action.payload,
            };

        case WISHLIST_ITEM:
            return {
                ...state,
                wishlistCount: action.payload,
            };

        case CHECK_TOKEN:
            return {
                ...state,
                checkToken: action.payload,
            };

        case 'SET_TOKEN_AVAILABILITY':
            return {
                ...state,
                tokenAvailable: action.payload,
            };

        case REMOVE_ITEM:
            const deleteArray = state.filter((item, index) => {
                return (index !== action.payload);
            });
            return deleteArray;
        default:
            return state;
    }
}
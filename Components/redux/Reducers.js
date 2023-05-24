import { ADD_ITEM, REMOVE_ITEM,WISHLIST_ITEM } from "./ActionTypes";


export const Reducers = (state={}, action) => {
    // console.log("On Reducers state => ",state," action => ",action);
    switch (action.type) {
        case ADD_ITEM:
            return action.payload;
        
        case WISHLIST_ITEM:
            return action.payload;

        case REMOVE_ITEM:
            const deleteArray = state.filter((item, index) => {
                return (index !== action.payload);
            });
            return deleteArray;
        default:
            return state;
    }
}
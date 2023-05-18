import { ADD_ITEM, REMOVE_ITEM } from "./ActionTypes";

export const Reducers = (state, action) => {
    
    switch (action.type) {
        case ADD_ITEM:
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
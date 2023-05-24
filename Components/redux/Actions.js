import { ADD_ITEM, REMOVE_ITEM ,WISHLIST_ITEM} from "./ActionTypes";

export const addItemToCart = data => (
    {
    type: ADD_ITEM,
    payload: data,
    }
);
export const WishListItems = data => (
    {
        type: WISHLIST_ITEM,
        payload: data,
    }
);

export const removeItemFromCart = data => ({
    type:REMOVE_ITEM,
    payload: data,
});
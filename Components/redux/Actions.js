import { ADD_ITEM, REMOVE_ITEM ,WISHLIST_ITEM,CHECK_TOKEN} from "./ActionTypes";

export const addItemToCart = (cartCount) => (
    {
    type: ADD_ITEM,
    payload: cartCount,
    }
);
export const addItemToWishlist = (wishlistCount) => (
    {
        type: WISHLIST_ITEM,
        payload: wishlistCount,
    }
);

export const removeItemFromCart = data => ({
    type:REMOVE_ITEM,
    payload: data,
});

export const setTokenAvailability = (isTokenAvailable) => ({
    type: 'SET_TOKEN_AVAILABILITY',
    payload: isTokenAvailable,
  });

export const checkToken = data => ({
    type:CHECK_TOKEN,
    payload: data,
});
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart-actions';
import { ADD_ORDER } from '../actions/order-actions';

import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/product-actions';

const initialState = {
    items: {},
    totalAmount: 0,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            const addedProduct = payload;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                //already have an item in the cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice,
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + productPrice,
            };
        case REMOVE_FROM_CART:
            const selectedItem = state.items[payload];
            const currentQty = selectedItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {
                //need to reduce, not erase
                const updatedCartItem = new CartItem(
                    currentQty - 1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    selectedItem.sum - selectedItem.productPrice,
                );
                updatedCartItems = { ...state.items, [payload]: updatedCartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[payload];
            }
            return { ...state, items: updatedCartItems, totalAmount: state.totalAmount - selectedItem.productPrice };
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[payload]) {
                return { ...state };
            }
            const updatedItems = { ...state.items };
            const itemTotal = state.items[payload].sum;
            delete updatedItems[payload];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal,
            };
        default:
            return state;
    }
};

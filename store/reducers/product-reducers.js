import PRODUCTS from '../../data/data';
import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/product-actions';

const initialState = {
    avaliableProducts: [],
    userProducts: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_PRODUCTS:
            return {
                ...state,
                avaliableProducts: payload.loadedProducts,
                userProducts: payload.userProducts,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter((product) => product.id !== payload),
                avaliableProducts: state.avaliableProducts.filter((product) => product.id !== payload),
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                payload.id,
                payload.ownerId,
                payload.title,
                payload.description,
                payload.imageUrl,
                payload.price,
            );
            return {
                ...state,
                avaliableProducts: state.avaliableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            };
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex((prod) => prod.id === payload.id);
            const updatedProduct = new Product(
                payload.id,
                state.userProducts[productIndex].ownerId,
                payload.title,
                payload.imageUrl,
                payload.description,
                state.userProducts[productIndex].price,
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;

            const avaliableProductIndex = state.avaliableProducts.findIndex((prod) => prod.id === payload.id);
            const updatedAvaliableProducts = [...state.avaliableProducts];
            updatedAvaliableProducts[avaliableProductIndex] = updatedProduct;
            return {
                ...state,
                avaliableProducts: updatedAvaliableProducts,
                userProducts: updatedUserProducts,
            };
        default:
            return state;
    }
};

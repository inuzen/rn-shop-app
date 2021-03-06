import { ActionSheetIOS } from 'react-native';
import Order from '../../models/order';
import { ADD_ORDER, SET_ORDERS } from '../actions/order-actions';

const initialState = {
    orders: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ORDERS:
            return {
                orders: payload,
            };
        case ADD_ORDER:
            const newOrder = new Order(payload.id, payload.items, payload.amount, payload.date);
            return { ...state, orders: state.orders.concat(newOrder) };

        default:
            return state;
    }
};

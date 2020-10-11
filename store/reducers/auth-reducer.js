import { SIGN_IN, SIGN_UP } from '../actions/auth-actions';

const initialState = {
    token: null,
    userId: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGN_UP:
            return { ...state, token: payload.token, userId: payload.userId };

        case SIGN_IN:
            return { ...state, token: payload.token, userId: payload.userId };

        default:
            return state;
    }
};

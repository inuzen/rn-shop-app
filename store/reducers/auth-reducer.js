import { AUTHENCICATE, SIGN_OUT } from '../actions/auth-actions';

const initialState = {
    token: null,
    userId: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        // case SIGN_UP:
        //     return { ...state, token: payload.token, userId: payload.userId };

        case AUTHENCICATE:
            return { ...state, token: payload.token, userId: payload.userId };
        case SIGN_OUT:
            return initialState;
        default:
            return state;
    }
};

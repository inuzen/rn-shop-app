import { AsyncStorage } from 'react-native';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const AUTHENCICATE = 'AUTHENCICATE';

let timer;

export const signUp = (email, password) => {
    return async (dispatch) => {
        const res = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJDMCBE70GpwMHKjCv8L2TVtx7KzGoqRo',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            },
        );
        if (!res.ok) {
            const errResData = await res.json();
            const errorId = errResData.error.message;
            let msg = 'Something went wrong';
            if (errorId === 'EMAIL_EXISTS') {
                msg = 'This email already in use';
            }

            throw new Error(msg);
        }

        const resData = await res.json();
        dispatch(authenticate(resData.localId, resData.idToken, expirationDate));
        // dispatch({
        //     type: SIGN_UP,
        //     payload: {
        //         token: resData.idToken,
        //         userId: resData.localId,
        //     },
        // });
        const expirationDate = new Date(new Date().getTime(), parseInt(resData.expiresIn) * 1000); //expiresIn is in seconds but getTime in ms

        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};
export const signIn = (email, password) => {
    return async (dispatch) => {
        const res = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJDMCBE70GpwMHKjCv8L2TVtx7KzGoqRo',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            },
        );
        if (!res.ok) {
            const errResData = await res.json();
            const errorId = errResData.error.message;
            let msg = 'Something went wrong';
            if (errorId === 'EMAIL_NOT_FOUND') {
                msg = 'This email cant be found';
            }
            if (errorId === 'INVALID_PASSWORD') {
                msg = 'Invalid password';
            }
            throw new Error(msg);
        }

        const resData = await res.json();

        // dispatch({
        //     type: SIGN_IN,
        //     payload: {
        //         token: resData.idToken,
        //         userId: resData.localId,
        //     },
        // });

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));

        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000); //expiresIn is in seconds but getTime in ms
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const logOut = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: SIGN_OUT };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};
const setLogoutTimer = (expTime) => {
    return (dispatch) => {
        timer = setTimeout(() => {
            dispatch(logOut());
        }, expTime);
    };
};

export const authenticate = (userId, token, expiryTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENCICATE,
            payload: { userId, token },
        });
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(),
        }),
    );
};

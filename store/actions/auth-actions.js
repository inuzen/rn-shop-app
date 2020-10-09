export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

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

        dispatch({ type: SIGN_UP });
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
        console.log(resData);
        dispatch({ type: SIGN_IN });
    };
};

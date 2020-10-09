import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://rn-shop-app-ef53b.firebaseio.com/products.json');
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        'u1',
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price,
                    ),
                );
            }

            dispatch({
                type: SET_PRODUCTS,
                payload: loadedProducts,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const deleteProduct = (productId) => {
    return async (dispatch) => {
        //any async code here
        //.json is because of a firebase
        const response = await fetch(`https://rn-shop-app-ef53b.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        dispatch({
            type: DELETE_PRODUCT,
            payload: productId,
        });
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch) => {
        //any async code here
        //.json is because of a firebase
        const response = await fetch('https://rn-shop-app-ef53b.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
            }),
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            payload: { id: resData.name, title, description, imageUrl, price },
        });
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch) => {
        //any async code here

        //.json is because of a firebase
        const response = await fetch(`https://rn-shop-app-ef53b.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            }),
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        dispatch({
            type: UPDATE_PRODUCT,
            payload: { id, title, description, imageUrl },
        });
    };
};

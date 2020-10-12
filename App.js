import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import NavigationContainer from './navigation/NavigationContainer';
import productsReducer from './store/reducers/product-reducers';
import cartReducer from './store/reducers/cart-reducer';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { composeWithDevTools } from 'redux-devtools-extension';
import ordersReducer from './store/reducers/orders-reducer';
import authReducer from './store/reducers/auth-reducer';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => {
                    setFontLoaded(true);
                }}
            />
        );
    }
    return (
        <Provider store={store}>
            <NavigationContainer />
        </Provider>
    );
}

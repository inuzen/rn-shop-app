import React from 'react';
import { SafeAreaView, Button, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { isAndroid } from '../utility/helper-fns';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth-actions';

const defaultNavOption = {
    headerStyle: {
        backgroundColor: isAndroid() ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerTintColor: isAndroid() ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen,
    },
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons name={isAndroid() ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />
            ),
        },
        defaultNavigationOptions: defaultNavOption,
    },
);

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen,
    },
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons name={isAndroid() ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />
            ),
        },
        defaultNavigationOptions: defaultNavOption,
    },
);
const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductsScreen,
        EditProduct: EditProductScreen,
    },
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons name={isAndroid() ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />
            ),
        },
        defaultNavigationOptions: defaultNavOption,
    },
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator,
        Admin: AdminNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary,
        },
        contentComponent: (props) => {
            const dispatch = useDispatch();
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerNavigatorItems {...props} />
                        <Button
                            title="Logout"
                            color={Colors.primary}
                            onPress={() => {
                                dispatch(authActions.logOut());
                                props.navigation.navigate('Auth');
                            }}
                        />
                    </SafeAreaView>
                </View>
            );
        },
    },
);

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen,
    },
    {
        defaultNavigationOptions: defaultNavOption,
    },
);

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator,
});
export default createAppContainer(MainNavigator);

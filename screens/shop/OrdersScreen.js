import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/ui/HeaderButton';
import { isAndroid } from '../../utility/helper-fns';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/order-actions';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => {
    const orders = useSelector((state) => state.orders.orders);

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(orderActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <FlatList
            data={orders}
            renderItem={(itemData) => {
                return (
                    <OrderItem
                        amount={itemData.item.totalAmount}
                        date={itemData.item.dateString}
                        items={itemData.item.items}
                    />
                );
            }}
        />
    );
};

OrdersScreen.navigationOptions = (navData) => {
    return {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={isAndroid() ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerTitle: 'Your Orders',
    };
};

export default OrdersScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

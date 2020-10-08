import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/ui/HeaderButton';
import { isAndroid } from '../../utility/helper-fns';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = (props) => {
    const orders = useSelector((state) => state.orders.orders);
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

const styles = StyleSheet.create({});

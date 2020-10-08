import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/ui/Card';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart-actions';
import * as orderActions from '../../store/actions/order-actions';

const CartScreen = (props) => {
    const {} = props;
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            const { productTitle, productPrice, quantity, sum } = state.cart.items[key];
            transformedCartItems.push({
                productId: key,
                productTitle,
                productPrice,
                quantity,
                sum,
            });
        }
        return transformedCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button
                    title="Order Now"
                    color={Colors.accent}
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
                    }}
                    disabled={!cartItems.length}
                />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.productId}
                renderItem={(itemData) => {
                    const { productTitle, productId, quantity, sum } = itemData.item;
                    return (
                        <CartItem
                            removable
                            onRemove={() => {
                                dispatch(cartActions.removeFromCart(productId));
                            }}
                            title={productTitle}
                            amount={sum}
                            quantity={quantity}
                        />
                    );
                }}
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart',
};

export default CartScreen;

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary,
    },
});

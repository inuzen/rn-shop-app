import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../ui/Card';
import CartItem from './CartItem';

const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                color={Colors.primary}
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => {
                    setShowDetails((prevState) => !prevState);
                }}
            />
            {showDetails && (
                <View style={styles.detailsItem}>
                    {props.items.map((item) => (
                        <CartItem
                            key={item.productId}
                            onRemove={() => {}}
                            title={item.productTitle}
                            amount={item.sum}
                            quantity={item.quantity}
                        />
                    ))}
                </View>
            )}
        </Card>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    orderItem: {
        padding: 10,
        margin: 20,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888',
    },
    detailsItem: {
        width: '100%',
    },
});

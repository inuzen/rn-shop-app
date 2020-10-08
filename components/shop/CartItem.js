import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isAndroid } from '../../utility/helper-fns';

const CartItem = (props) => {
    const { onRemove, title, amount, quantity, removable } = props;
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity} </Text>
                <Text style={styles.mainText}>{title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>{amount.toFixed(2)}</Text>
                {removable && (
                    <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
                        <Ionicons name={isAndroid() ? 'md-trash' : 'ios-trash'} size={23} color="tomato" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },

    deleteButton: {
        marginLeft: 20,
    },
});

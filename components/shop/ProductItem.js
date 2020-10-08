import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

import { isAndroid } from '../../utility/helper-fns';
import Card from '../ui/Card';

const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (isAndroid()) {
        TouchableCmp = TouchableNativeFeedback;
    }
    const { imageUrl, title, price, onSelect } = props;
    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: imageUrl }} />
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.price}>$ {price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>{props.children}</View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detail: {
        alignItems: 'center',
        height: '17%',
        padding: 10,
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold',
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20,
    },
});

export default ProductItem;

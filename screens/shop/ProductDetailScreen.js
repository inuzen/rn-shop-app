import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart-actions';

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');

    const selectedProduct = useSelector((state) =>
        state.products.avaliableProducts.find((prod) => prod.id === productId),
    );

    const dispatch = useDispatch();
    const { imageUrl, price, description } = selectedProduct;

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add to cart"
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct));
                    }}
                />
            </View>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
};
ProductDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productTitle'),
    };
};
export default ProductDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'open-sans',
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    },
});

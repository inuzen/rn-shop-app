import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Button, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as cartActions from '../../store/actions/cart-actions';
import * as productActions from '../../store/actions/product-actions';
import HeaderButton from '../../components/ui/HeaderButton';
import { isAndroid } from '../../utility/helper-fns';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector((state) => state.products.avaliableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { productId: id, productTitle: title });
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured!</Text>
                <Button title="Try Again" onPress={loadProducts} color={Colors.primary} />
            </View>
        );
    }
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }
    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found!</Text>
            </View>
        );
    }
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
                const { id, imageUrl, title, price } = itemData.item;
                return (
                    <ProductItem
                        title={title}
                        price={price}
                        imageUrl={imageUrl}
                        onSelect={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    >
                        <Button
                            color={Colors.primary}
                            title="View Details"
                            onPress={() => {
                                selectItemHandler(itemData.item.id, itemData.item.title);
                            }}
                        />
                        <Button
                            color={Colors.primary}
                            title="To cart"
                            onPress={() => {
                                dispatch(cartActions.addToCart(itemData.item));
                            }}
                        />
                    </ProductItem>
                );
            }}
        />
    );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Cart"
                    iconName={isAndroid() ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                />
            </HeaderButtons>
        ),
    };
};
export default ProductsOverviewScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

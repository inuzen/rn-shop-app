import React from 'react';
import { StyleSheet, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as cartActions from '../../store/actions/cart-actions';
import HeaderButton from '../../components/ui/HeaderButton';
import { isAndroid } from '../../utility/helper-fns';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
    const products = useSelector((state) => state.products.avaliableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { productId: id, productTitle: title });
    };

    return (
        <FlatList
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

const styles = StyleSheet.create({});

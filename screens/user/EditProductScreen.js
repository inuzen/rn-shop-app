import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View } from 'react-native';
import HeaderButton from '../../components/ui/HeaderButton';
import { isAndroid } from '../../utility/helper-fns';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../../store/actions/product-actions';

const EditProductScreen = (props) => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === prodId));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productActions.updateProduct(prodId, title, description, imageUrl));
        } else {
            dispatch(productActions.createProduct(title, description, imageUrl, +price));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, imageUrl, price, description]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={(text) => setImageUrl(text)} />
                </View>
                {!editedProduct && (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.input} value={price} onChangeText={(text) => setPrice(text)} />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={(text) => setDescription(text)} />
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Save" iconName={isAndroid() ? 'md-checkmark' : 'ios-checkmark'} onPress={submitFn} />
            </HeaderButtons>
        ),
    };
};

export default EditProductScreen;

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});
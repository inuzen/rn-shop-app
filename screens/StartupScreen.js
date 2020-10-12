import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth-actions';

const StartupScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expDate = new Date(expiryDate);
            if (expDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            const expTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expTime));
        };
        tryLogin();
    }, [dispatch]);
    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" colors={Colors.primary} />
        </View>
    );
};

export default StartupScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

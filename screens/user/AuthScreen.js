import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Button,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { isAndroid } from '../../utility/helper-fns';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
        };
    }
    return state;
};

const AuthScreen = (props) => {
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authActions.signUp(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = authActions.signIn(formState.inputValues.email, formState.inputValues.password);
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error, [{ text: 'ok' }]);
        }
    }, [error]);
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier,
            });
        },
        [dispatchFormState],
    );

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });
    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={isAndroid() ? 'height' : 'padding'}
            keyboardVerticalOffset={50}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="please enter a valid email"
                            initialValue=""
                            onInputChange={inputChangeHandler}
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            required
                            secureTextEntry
                            minLength={5}
                            autoCapitalize="none"
                            errorText="please enter a valid pass"
                            initialValue=""
                            onInputChange={inputChangeHandler}
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={Colors.primary} />
                            ) : (
                                <Button
                                    title={isSignUp ? 'Sign Up' : 'Login'}
                                    color={Colors.primary}
                                    onPress={authHandler}
                                    disabled={!formState.formIsValid}
                                />
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                                color={Colors.accent}
                                onPress={() => {
                                    setIsSignUp((prev) => !prev);
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationoptions = {
    headerTitle: 'Auth',
};
export default AuthScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

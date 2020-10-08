import { Platform } from 'react-native';

export const isAndroid = () => {
    return Platform.OS === 'android' && Platform.Version >= 21;
};

export const isIOS = () => {
    return Platform.OS === 'ios';
};

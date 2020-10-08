import React from 'react';

import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { isAndroid } from '../../utility/helper-fns';

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={isAndroid() ? 'white' : Colors.primary}
        />
    );
};

export default CustomHeaderButton;

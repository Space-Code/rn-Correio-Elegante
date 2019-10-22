import React, {useEffect, useState} from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode';


// import { Container } from './styles';

export default function onboarding() {

    styles = useDynamicStyleSheet(dynamicStyles);
    Icon.loadFont();
    
    return (
        <SafeAreaView style={styles.container}>
            <Icon style={styles.iconFont} name='empire' />
            <Icon style={styles.iconFont} name='resistance' />
        </SafeAreaView>
    );
}

const dynamicStyles = new DynamicStyleSheet({

    container: {
        flex: 1,
        backgroundColor: new DynamicValue('#f5f5f5', '#aaaddd')
    },

    iconFont: {
        fontSize: 60,
        paddingHorizontal: 170,
        paddingVertical: 150
    }
    
});
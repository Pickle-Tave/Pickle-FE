/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "react-native-gesture-handler";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const MyPage = () => {
    return (
        <View style={styles.container}>
            <Text>Mypage 화면</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyPage;

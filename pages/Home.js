import "react-native-gesture-handler";

import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native';

const { width } = Dimensions.get('window');

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.Logostyle}
                    source={require('../assets/icon/logo_big.png')}
                />
            </View>
            <View style={styles.Recommend}>
                <Image 
                    style={styles.recommendImage}
                    source={require('../assets/icon/place_rcmd.png')}
                    resizeMode="contain"
                />
                <Image 
                    style={styles.recommendImage}
                    source={require('../assets/icon/pose_rcmd.png')}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.hashtagContainer}>
            <TouchableOpacity 
            style={styles.hashtagButton} 
            onPress={() => navigation.navigate('MyPage')}
            >
                    <Text style={styles.hashtagButtonText}>#해시태그 설정하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0, // 컨테이너 패딩 제거
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 450, // 필요한 경우 조정
        marginBottom: 0, // 아래 간격 제거
        paddingBottom: 0, // 패딩 제거
    },
    Logostyle: {
        height: 320,
        width: 370,
    },
    Recommend: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recommendImage: {
        flex: 1,
        maxWidth: (width - 40) / 2, // 이미지가 화면 너비의 절반을 넘지 않도록 설정, 패딩 포함
        aspectRatio: 1, // 원본 비율 유지
        marginHorizontal: 5, // 이미지 사이의 간격 조정
    },
    hashtagContainer: {
        alignItems: 'center', // 이미지가 가운데 정렬되도록 설정
        marginTop: 0, // 추천 이미지와 해시태그 이미지 사이의 간격 제거
        marginBottom: 80
    },
    hashtagButton: {
        width: '95%',
        backgroundColor: '#FFFDDB',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hashtagButtonText: {
        color: 'black',
        fontSize: 16,
    }
});

export default Home;

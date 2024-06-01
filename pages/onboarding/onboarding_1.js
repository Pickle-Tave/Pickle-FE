import "react-native-gesture-handler";

import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const Onboarding_1 = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/img/onboarding.png')}
                    style={styles.image}
                    resizeMode="contain" // 이미지의 원본 비율을 유지하면서 화면에 맞추기
                />
                <Text style={[styles.text, styles.textMent1]}>
                    갤러리 속 수많은 사진들,
                </Text>
                <Text style={[styles.text, styles.textMent2]}>
                    어떻게 정리하시나요?
                </Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Onboarding_2')}>
                    <Text style={styles.button}>다음</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // 세로 축에서 중앙 정렬
        alignItems: 'center',     // 가로 축에서 중앙 정렬
        backgroundColor: 'white',  // 배경색 설정 (선택 사항)
    },
    imageContainer: {
        width: '100%',  // 이미지 컨테이너의 너비 설정
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // 텍스트를 절대 위치로 설정하기 위해 상대 위치로 설정
    },
    image: {
        width: '100%',  // 이미지 컨테이너의 너비에 맞추기
        height: 930, // 이미지 높이 설정 (원하는 크기로 조정)
    },
    text: {
        position: 'absolute',
        color: '#000', // 텍스트 색상 설정
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textMent1: {
        top: 120, // 첫 번째 텍스트의 위치 설정
    },
    textMent2: {
        top: 150, // 두 번째 텍스트의 위치 설정
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,  // 버튼을 이미지 하단에 배치
        width: '100%',  // 버튼 너비 설정
        alignItems: 'center', // 가로축을 기준으로 중앙 정렬
    },
    button: {
        backgroundColor: '#7FB373',
        color: 'white',
        width: '80%',
        textAlign: 'center',
        borderRadius: 10,
        paddingBottom: 15,
        paddingTop: 15,
        fontSize: 20,
        marginBottom: 100,
        fontWeight: 'bold',
    }
});

export default Onboarding_1;

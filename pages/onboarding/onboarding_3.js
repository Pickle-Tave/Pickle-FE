import 'react-native-gesture-handler';

import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Onboarding_3 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.PickleLogo}
        source={require('../../assets/icon/logo_small.png')}
      />
      <View style={styles.imageContainer}>
        <Text style={styles.Ment}>베스트 컷, 제가 건져드릴게요!</Text>
        <Image
          style={styles.PickleImage}
          source={require('../../assets/icon/pickle_best.png')}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Onboarding_4')}
        style={styles.buttonContainer}>
        <Text style={styles.button}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // 상하단에 공간을 분배
    alignItems: 'center', // 가로 축에서 중앙 정렬
    backgroundColor: 'white', // 배경색 설정 (선택 사항)
    marginTop: 0,
  },
  imageContainer: {
    flex: 1, // 남은 공간을 차지하도록 설정
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // 이미지 컨테이너의 너비 설정
  },
  buttonContainer: {
    width: '100%', // 버튼 너비 설정
    alignItems: 'center', // 버튼을 중앙에 정렬
    marginBottom: 100, // 하단 여백 추가
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
    fontWeight: 'bold',
  },
  Ment: {
    fontSize: 20,
    textAlign: 'center', // 텍스트를 중앙 정렬
    marginVertical: 2, // 텍스트 간격 추가
    fontWeight: 'bold',
  },
  PickleLogo: {
    width: 120, // 이미지의 너비를 줄여서 설정
    height: 110, // 이미지의 높이를 줄여서 설정
    marginBottom: 0, // 로고와 이미지 사이 간격 줄이기
    marginTop: 40,
  },
  PickleImage: {
    marginLeft: 40,
    width: 360, // 이미지의 너비를 줄여서 설정
    height: 360, // 이미지의 높이를 줄여서 설정
    aspectRatio: 1, // 원본 비율 유지
    marginVertical: 70, // 이미지 상하 간격 추가
  },
});

export default Onboarding_3;

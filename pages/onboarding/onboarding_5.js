import 'react-native-gesture-handler';

import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const Onboarding_5 = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.PickleLogo}
        source={require('../../assets/icon/logo_small.png')}
      />
      <View style={styles.imageContainer}>
        <Text style={styles.Ment}>그럼, 준비됐나요?</Text>
        <Image
          style={styles.PickleImage}
          source={require('../../assets/icon/pickle_ready.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Image
            style={styles.kakaoIcon}
            source={require('../../assets/icon/kakao.png')}
          />
          <Text style={styles.buttonText}>로그인</Text>
        </View>
      </View>
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
    backgroundColor: '#FFEB00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10, // 이미지와 텍스트 사이의 간격
  },
  kakaoIcon: {
    width: 20,
    height: 20,
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
    marginLeft: 20,
    width: 300, // 이미지의 너비를 줄여서 설정
    height: 300, // 이미지의 높이를 줄여서 설정
    aspectRatio: 1, // 원본 비율 유지
    marginVertical: 105, // 이미지 상하 간격 추가
  },
});

export default Onboarding_5;

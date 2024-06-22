import 'react-native-gesture-handler';
import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginKakao} from '../../api/loginKakao';
import axios from '../../api/axios';
import {REACT_APP_REST_API_KEY} from '@env';

const Onboarding_5 = () => {
  const REST_API_KEY = 'f5f79be138b94b36d3be6f56a53a610e';
  const REDIRECT_URI =
    'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com/login/oauth2/code/kakao';
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [accessToken, setAccessToken] = useState(null); // 카카오에서 받은 액세스 토큰 저장

  const handleLogin = () => {
    // 카카오 인증 페이지로 이동
    Linking.openURL(KAKAO_AUTH_URI);
  };

  // 카카오에서 토큰 받기
  // 카카오에서 받은 인증코드를 사용해 액세스 토큰 요청
  // 성공 -> AsyncStorage에 액세스 토큰, 리프세시 토큰 저장

  const getTokensFromKakao = useCallback(
    async code => {
      try {
        // 백엔드로 인증 코드 전송
        const loginData = await loginKakao(code);
        console.log('Login data received:', loginData); // 로그인 데이터 로그 출력

        if (loginData.success) {
          await AsyncStorage.setItem('accessToken', loginData.data.accessToken);
          await AsyncStorage.setItem(
            'refreshToken',
            loginData.data.refreshToken,
          );
          Alert.alert(
            '로그인 성공',
            '카카오 로그인이 성공적으로 완료되었습니다.',
          );
        } else {
          throw new Error('백엔드 서버에서 인증에 실패했습니다.');
        }
      } catch (error) {
        Alert.alert(
          '로그인 실패',
          error.message || '서버와 통신하는 중 오류가 발생했습니다.',
        );
      }
    },
    [REST_API_KEY, REDIRECT_URI],
  );

  // 카카오 인증을 마치고 오면 url에 포함된 인증코드를 추출하고 이를 통해 토큰 요청

  useEffect(() => {
    const handleUrl = async event => {
      const url = event.url;
      console.log('Received URL:', url); // URL 로그 출력

      if (url.startsWith(REDIRECT_URI)) {
        const urlParams = new URLSearchParams(new URL(url).search);
        const code = urlParams.get('code');

        if (code) {
          console.log('Extracted code:', code); // 추출된 코드 로그 출력
          await getTokensFromKakao(code);
        } else {
          Alert.alert('인증 코드 오류', '인증 코드를 가져오지 못했습니다.');
        }
      }
    };

    const linkingListener = Linking.addListener('url', handleUrl);

    return () => {
      linkingListener.remove();
    };
  }, [REDIRECT_URI, getTokensFromKakao]);

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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Image
            style={styles.kakaoIcon}
            source={require('../../assets/icon/kakao.png')}
          />
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 0,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 100,
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
    marginLeft: 10,
  },
  kakaoIcon: {
    width: 20,
    height: 20,
  },
  Ment: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 2,
    fontWeight: 'bold',
  },
  PickleLogo: {
    width: 120,
    height: 110,
    marginBottom: 0,
    marginTop: 40,
  },
  PickleImage: {
    marginLeft: 20,
    width: 300,
    height: 300,
    aspectRatio: 1,
    marginVertical: 105,
  },
});

export default Onboarding_5;

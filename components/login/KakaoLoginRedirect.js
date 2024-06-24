import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginKakao} from '../../api/loginKakao';

const KakaoLoginRedirect = ({handleLoginSuccess}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const code = route.params.token;

  useEffect(() => {
    const handleLogin = async () => {
      if (code) {
        try {
          const loginData = await loginKakao(code);
          if (loginData.success) {
            await AsyncStorage.setItem(
              'accessToken',
              loginData.data.accessToken,
            );
            await AsyncStorage.setItem(
              'refreshToken',
              loginData.data.refreshToken,
            );
            Alert.alert(
              '로그인 성공',
              '카카오 로그인이 성공적으로 완료되었습니다.',
            );
            handleLoginSuccess();
          } else {
            throw new Error('백엔드 서버에서 인증에 실패했습니다.');
          }
        } catch (error) {
          Alert.alert(
            '로그인 실패',
            error.message || '서버와 통신하는 중 오류가 발생했습니다.',
          );
          navigation.navigate('Onboarding_5'); // 로그인 실패 시 이동할 화면
        }
      } else {
        Alert.alert('인증 코드 오류', '인증 코드를 가져오지 못했습니다.');
        navigation.navigate('Onboarding_5'); // 인증 코드 오류 시 이동할 화면
      }
    };

    handleLogin();
  }, [code, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KakaoLoginRedirect;

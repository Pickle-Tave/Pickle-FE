import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {REACT_APP_REST_API_KEY, REACT_APP_REDIRECT_URI} from '@env';

const KakaoLoginWebview = () => {
  const navigation = useNavigation();
  const REACT_APP_REST_API_KEY = 'f5f79be138b94b36d3be6f56a53a610e';
  const REACT_APP_REDIRECT_URI =
    'http://pickle-alb-478419970.ap-northeast-2.elb.amazonaws.com/login/oauth2/code/kakao';
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code`;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: KAKAO_AUTH_URI}}
        onNavigationStateChange={e => {
          if (e.url.startsWith(REACT_APP_REDIRECT_URI)) {
            const code = e.url.split('code=')[1];
            navigation.navigate('KakaoLoginRedirect', {token: code});
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default KakaoLoginWebview;

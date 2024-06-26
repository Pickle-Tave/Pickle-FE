import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {REACT_APP_REST_API_KEY, REDIRECT_URI, KAKAO_AUTH_URI} from '@env'

const KakaoLoginWebview = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: KAKAO_AUTH_URI}}
        onNavigationStateChange={e => {
          if (e.url.startsWith(REDIRECT_URI)) {
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

import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Onboarding_5 = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('KakaoLoginWebview');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.PickleLogo} source={require('../../assets/icon/logo_small.png')} />
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
          <Image style={styles.kakaoIcon} source={require('../../assets/icon/kakao.png')} />
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

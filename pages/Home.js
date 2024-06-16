import 'react-native-gesture-handler';

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
import PoseRCMD from '../components/PoseRCMD';
import PlaceRCMD from '../components/PlaceRCMD';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.Logostyle}
          source={require('../assets/icon/logo_big.png')}
        />
      </View>
      <PoseRCMD />
      <PlaceRCMD />
      <View style={styles.hashtagContainer}>
        <TouchableOpacity
          style={styles.hashtagButton}
          onPress={() => navigation.navigate('MyPage')}>
          <Text style={styles.hashtagButtonText}>#해시태그 설정하러 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0, // 컨테이너 패딩 제거
    backgroundColor: 'white',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, 
    marginTop: 10,
    height: 150
  },
  Logostyle: {
    height: 110,
    width: 160,
  },
  hashtagContainer: {
    alignItems: 'center', // 이미지가 가운데 정렬되도록 설정
    marginTop: 0, // 추천 이미지와 해시태그 이미지 사이의 간격 제거
  },
  hashtagButton: {
    width: '93%',
    height: '29%',
    backgroundColor: '#FFFDDB',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashtagButtonText: {
    color: 'black',
    fontSize: 14,
  },
});

export default Home;

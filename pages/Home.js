import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import PoseRCMD from '../components/PoseRCMD';
import PlaceRCMD from '../components/PlaceRCMD';

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
          onPress={() =>
            navigation.navigate('MyPage')
          }>
          <Text style={styles.hashtagButtonText}>#해시태그 설정하러 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    height: 150,
  },
  Logostyle: {
    height: 110,
    width: 160,
  },
  hashtagContainer: {
    alignItems: 'center',
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

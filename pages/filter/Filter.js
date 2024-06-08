import 'react-native-gesture-handler';

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Filter = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.step_0}
        source={require('../../assets/icon/step_0.png')}
        resizeMode="contain"
      />
      <Text style={styles.text}>사진을 선택하세요!</Text>
      <Image
        style={styles.tip}
        source={require('../../assets/icon/tip.png')}
        resizeMode="contain"
      />
      <Image
        style={styles.gallery}
        source={require('../../assets/icon/go_gallery.png')}
        resizeMode="contain"
      />
      <Text style={styles.text_tip}>나만의 추억이 담긴 사진을 정리해요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  step_0: {
    width: 300,
    margin: 10,
    left: 40,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tip: {
    width: 40,
    height: 40,
    left: 50,
    top: 430,
  },
  gallery: {
    width: 370,
    height: 370,
    top: -15,
    left: 15,
  },
  text_tip: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 28,
    left: 20,
  },
});

export default Filter;

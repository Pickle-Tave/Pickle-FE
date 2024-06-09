import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';

const Filter2 = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('Filter3');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.step_2}
        source={require('../../assets/icon/step_2.png')}
        resizeMode="contain"
      />
      <Text style={styles.text}>Loading...</Text>

      <SkypeIndicator color="#606E76" size={145} style={styles.indicator} />

      <Image
        style={styles.tip}
        source={require('../../assets/icon/tip.png')}
        resizeMode="contain"
      />
      <Text style={styles.text1}>작업 완료 시, 알림을 통해 알려드려요!</Text>
      <Text style={styles.text2}>(약 2~3분 정도 소요)</Text>

      <TouchableOpacity onPress={handleNavigation}>
        <Image
          style={styles.next}
          source={require('../../assets/icon/next2.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  step_2: {
    width: 300,
    margin: 10,
    left: 40,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    top: 30,
    color: 'black',
  },
  indicator: {
    top: -80,
  },
  tip: {
    width: 40,
    height: 40,
    top: -130,
    left: 30,
  },
  text1: {
    fontSize: 18,
    textAlign: 'center',
    top: -165,
    left: 30,
    color: 'black',
  },
  text2: {
    fontSize: 15,
    textAlign: 'center',
    top: -150,
    left: 17,
    color: 'black',
  },
  next: {
    width: 120,
    left: 135,
    top: -100,
  },
});

export default Filter2;

import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';

const Filter2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.step_2}
        source={require('../../assets/icon/step_2.png')}
        resizeMode="contain"
      />
      <Text style={styles.text}>Loading...</Text>

      <SkypeIndicator color="#606E76" size={145} style={styles.indicator} />
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
  },
  indicator: {
    top: -100,
  },
});

export default Filter2;

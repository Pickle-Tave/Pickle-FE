import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Filter5 = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('Filter');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.step_4}
        source={require('../../assets/icon/step_4.png')}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={handleNavigation}>
        <Image
          style={styles.done}
          source={require('../../assets/icon/done2.png')}
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
  step_4: {
    width: 300,
    margin: 10,
    left: 40,
  },
  done: {
    width: 120,
    top: -10,
  },
});

export default Filter5;

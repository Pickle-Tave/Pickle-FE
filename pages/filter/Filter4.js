import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Filter4 = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    // navigation.navigate('Filter3');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.step_3}
        source={require('../../assets/icon/step_3.png')}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  step_3: {
    width: 300,
    margin: 10,
    left: 40,
  },
});

export default Filter4;

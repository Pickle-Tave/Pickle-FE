import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Filter1 = () => {
  const navigation = useNavigation();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handlePress1 = () => {
    setChecked1(!checked1);
  };

  const handlePress2 = () => {
    setChecked2(!checked2);
  };

  const handleNavigation = () => {
    navigation.navigate('Filter2');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.step_1}
        source={require('../../assets/icon/step_1.png')}
        resizeMode="contain"
      />
      <Image
        style={styles.option1}
        source={require('../../assets/icon/option1.png')}
        resizeMode="contain"
      />
      <TouchableOpacity>
        <Image
          style={styles.weak}
          source={require('../../assets/icon/weak.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.strong}
          source={require('../../assets/icon/strong.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Image
        style={styles.option2}
        source={require('../../assets/icon/option2.png')}
        resizeMode="contain"
      />
      <View style={styles.checkboxes}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handlePress1}>
          <View style={[styles.checkbox, checked1 && styles.checkedCheckbox]} />
          <Text style={styles.label}>선명하지 않은 사진 제외</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handlePress2}>
          <View style={[styles.checkbox, checked2 && styles.checkedCheckbox]} />
          <Text style={styles.label}>눈 감은 사진 제외</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigation}>
          <Image
            style={styles.next}
            source={require('../../assets/icon/next2.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  step_1: {
    width: 300,
    margin: 10,
    left: 40,
  },
  option1: {
    width: 200,
    left: 100,
  },
  weak: {
    width: 130,
    left: 60,
  },
  strong: {
    width: 130,
    top: -175,
    left: 220,
  },
  option2: {
    width: 184,
    left: 100,
    top: -160,
  },
  checkboxes: {
    top: -170,
    left: 90,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: '#769370',
    borderRadius: 8,
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#99AD81',
  },
  label: {
    fontSize: 18,
  },
  next: {
    width: 120,
    left: 45,
    top: 20,
  },
});

export default Filter1;

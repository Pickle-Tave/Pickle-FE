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
      <View style={styles.strengthContainer}>
        <TouchableOpacity>
          <Image
            style={styles.strong}
            source={require('../../assets/icon/strong.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.weak}
            source={require('../../assets/icon/weak.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <Image
        style={styles.option2}
        source={require('../../assets/icon/option2.png')}
        resizeMode="contain"
      />
      <View style={styles.checkboxes}>
        <TouchableOpacity
          style={[styles.textButton, checked1 && styles.checkedBackground]}
          onPress={handlePress1}>
          <Text style={[styles.label, checked1 && styles.checkedLabel]}>
            선명하지 않은 사진 제외
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.textButton, checked2 && styles.checkedBackground]}
          onPress={handlePress2}>
          <Text style={[styles.label, checked2 && styles.checkedLabel]}>
            눈 감은 사진 제외
          </Text>
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
    alignItems: 'center',
  },
  step_1: {
    width: 300,
    margin: 10,
  },
  option1: {
    width: 200,
  },
  strengthContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: -20,
  },
  weak: {
    width: 130,
    marginVertical: -50,
    top: -15,
  },
  strong: {
    width: 130,
    marginVertical: 10,
  },
  option2: {
    width: 184,
    top: -10,
  },
  separator: {
    width: '80%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 30,
  },
  checkboxes: {
    marginTop: 10,
    width: '55%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#769370',
    borderRadius: 8,
    marginRight: 8,
    margin: 5,
  },
  checkedBackground: {
    backgroundColor: '#B9CCA0',
    borderRadius: 13,
  },
  checkedLabel: {
    color: 'white',
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
  },
  next: {
    width: 120,
    marginTop: 30,
    left: 55,
  },
});

export default Filter1;

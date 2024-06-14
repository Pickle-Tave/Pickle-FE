import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';

const Filter5 = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const items = [
    {label: '동물', value: '동물'},
    {label: '여행', value: '여행'},
    {label: '일상', value: '일상'},
    {label: '청춘', value: '청춘'},
    {label: '행복', value: '행복'},
  ];

  const [images] = useState([
    {id: 1, src: require('../../assets/icon/photo1.png')},
    {id: 2, src: require('../../assets/icon/photo2.png')},
    {id: 3, src: require('../../assets/icon/photo3.png')},
    {id: 4, src: require('../../assets/icon/photo4.png')},
    {id: 5, src: require('../../assets/icon/photo5.png')},
  ]);

  const handleNavigation = () => {
    navigation.navigate('Filter');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.step_4}
            source={require('../../assets/icon/step_4.png')}
            resizeMode="contain"
          />

          <Text style={styles.text}>
            사진을 선택하고 원하는 앨범에 넣어보세요!
          </Text>
        </View>

        <View style={styles.selectContainer}>
          <RNPickerSelect
            onValueChange={value => setSelectedOption(value)}
            items={items}
            placeholder={{label: '앨범을 선택하세요', value: null}}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false} // 임시
          />
        </View>

        <View style={styles.gridContainer}>
          {images.map((image, index) => (
            <React.Fragment key={image.id}>
              {index % 2 === 0 && index !== 0 && (
                <View style={styles.separator} />
              )}
              <View style={styles.imageContainer}>
                <Image source={image.src} style={styles.image} />
              </View>
            </React.Fragment>
          ))}
        </View>

        <TouchableOpacity onPress={handleNavigation}>
          <Image
            style={styles.next}
            source={require('../../assets/icon/done2.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  step_4: {
    width: 300,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  selectContainer: {
    width: '90%',
    margin: 20,
  },
  next: {
    width: 120,
    marginTop: 20,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
};

export default Filter5;

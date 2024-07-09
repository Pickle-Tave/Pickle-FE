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
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import AlbumPlus from '../../components/Modal/AlbumPlus';

const Filter5 = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [plusVisible, setPlusVisible] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState([]);

  const route = useRoute();
  const {groupedImages} = route.params; // Filter4에서 전달된 groupedImages

  const albumList = useSelector(state => state.AlbumReducer); // 앨범 목록 가져오기

  const items = [
    {label: '동물', value: '동물'},
    {label: '여행', value: '여행'},
    {label: '일상', value: '일상'},
    {label: '청춘', value: '청춘'},
    {label: '행복', value: '행복'},
    {label: '새 앨범 추가하기', value: 'add_new_album'},
  ];

  const handleNavigation = () => {
    navigation.navigate('Filter');
  };

  const handleValueChange = value => {
    if (value === 'add_new_album') {
      setPlusVisible(true);
    } else {
      setSelectedOption(value);
    }
  };

  const handleAddNewAlbum = albumName => {
    if (albumName) {
      items.push({label: albumName, value: albumName});
      setSelectedOption(albumName);
    }
    setPlusVisible(false);
  };

  const handleImageSelect = id => {
    if (selectedImageIds.includes(id)) {
      setSelectedImageIds(selectedImageIds.filter(imageId => imageId !== id));
    } else {
      setSelectedImageIds([...selectedImageIds, id]);
    }
  };

  return (
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
          onValueChange={handleValueChange}
          items={items}
          placeholder={{label: '앨범을 선택하세요', value: null}}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
        />
      </View>

      <View style={styles.gridContainer}>
        {groupedImages.map((group, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 && index !== 0 && (
              <View style={styles.separator} />
            )}
            <View style={styles.imageContainer}>
              <TouchableOpacity style={styles.imageWrapper}>
                <Image source={{uri: group[0]}} style={styles.image} />
              </TouchableOpacity>
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

      <AlbumPlus
        visible={plusVisible}
        onClose={() => setPlusVisible(false)}
        onAddAlbum={handleAddNewAlbum}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '48%',
    marginBottom: 20,
  },
  selectContainer: {
    width: '90%',
    margin: 20,
  },
  separator: {
    width: '100%',
    height: 20,
  },
  image: {
    width: '100%',
    height: 150,
  },
  next: {
    width: 120,
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default Filter5;

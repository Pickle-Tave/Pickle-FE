import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import AlbumPlus from '../../components/Modal/AlbumPlus';
import {GetAlbumList} from '../../api/GetAlbumList';

const Filter5 = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [plusVisible, setPlusVisible] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const route = useRoute();
  const {groupedImages} = route.params; // Filter4에서 전달된 groupedImages
  const albumList = useSelector(state => state.AlbumListReducer.albumList); // 앨범 목록 가져오기
  const dispatch = useDispatch();
  const handleNavigation = () => {
    navigation.navigate('Filter');
  };

  useEffect(() => {
    dispatch(GetAlbumList(null, 10));
  }, [dispatch]);

  // 앨범 목록을 드롭다운 아이템 형태로 변환
  const items = albumList.map(album => ({
    label: album.album_name,
    value: album.album_id,
  }));

  items.push({label: '새 앨범 추가하기', value: 'add_new_album'});

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
                <Text style={styles.imageCount}>{`${group.length} 장`}</Text>
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
    margin: 10,
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
  imageWrapper: {
    position: 'relative',
    height: 150,
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
    width: '95%',
    height: 150,
    borderRadius: 10,
  },
  next: {
    width: 120,
    marginTop: 20,
  },
  imageCount: {
    position: 'absolute',
    bottom: 5,
    right: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
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
  imageCount: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
  },
});

export default Filter5;

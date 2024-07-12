import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import AlbumPlus from '../../components/Modal/AlbumPlus';
import {GetAlbumList} from '../../api/GetAlbumList';
import {AlbumSave} from '../../api/AlbumSave';

const Filter5 = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [plusVisible, setPlusVisible] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const route = useRoute();
  const {groupedImages, imageIds} = route.params; // imageIds 추가
  const [items, setItems] = useState([]);
  const albumList = useSelector(state => state.AlbumListReducer.albumList);
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigation.navigate('Filter');
  };

  useEffect(() => {
    if (!albumList.last && albumList.first) dispatch(GetAlbumList(null, 50));
  }, [albumList]);

  useEffect(() => {
    const newItems = albumList.map(album => ({
      label: album.searchedAlbumName,
      value: album.albumId,
    }));

    const addNewAlbumItem = {label: '새 앨범 추가하기', value: 'add_new_album'};
    if (!newItems.some(item => item.value === 'add_new_album')) {
      newItems.push(addNewAlbumItem);
    }
    setItems(newItems);
  }, [albumList]);

  const handleValueChange = async value => {
    if (value === 'add_new_album') {
      setPlusVisible(true);
    } else if (value) {
      setSelectedOption(value);
      await handleAlbumSelection(
        value,
        selectedGroupId ? imageIds[selectedGroupId] : [],
      );
    }
  };

  const handleAddNewAlbum = albumName => {
    if (albumName) {
      setItems(prevItems => {
        const newAlbumItem = {label: albumName, value: albumName};
        return [
          ...prevItems.filter(item => item.value !== 'add_new_album'),
          newAlbumItem,
          {label: '새 앨범 추가하기', value: 'add_new_album'},
        ];
      });
      setSelectedOption(albumName);
    }
    setPlusVisible(false);
  };

  const handleImageSelect = id => {
    if (selectedGroupId === id) {
      setSelectedGroupId(null);
    } else {
      setSelectedGroupId(id);
    }
  };

  const getImageContainerStyle = id => {
    return {
      ...styles.imageContainer,
      borderColor: id === selectedGroupId ? '#A9BB89' : 'white',
      borderWidth: id === selectedGroupId ? 5.5 : 0,
      opacity: id === selectedGroupId ? 0.5 : 1,
      borderRadius: 10,
      backgroundColor: id === selectedGroupId ? 'rgba(0, 0, 0, 0.5)' : 'white', // 모서리 채움
    };
  };

  const handleAlbumSelection = async (albumId, imageIds) => {
    try {
      const requestBody = {
        updateAlbumIdRequestList: [
          {
            albumId: albumId,
            imageIds: imageIds,
          },
        ],
      };

      const data = await AlbumSave(requestBody);
      console.log('앨범에 이미지 저장 성공', data);
      Alert.alert('앨범에 해당 그룹을 저장했습니다');
    } catch (error) {
      console.error('Failed to save images:', error);
      Alert.alert(
        'Error',
        `앨범에 이미지 저장 중 오류가 발생했습니다: ${error.message}`,
      );
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.step_4}
            source={require('../../assets/icon/step_4.png')}
            resizeMode="contain"
          />

          <Text style={styles.text}>
            그룹을 선택하고 원하는 앨범에 넣어보세요!
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
              <View style={getImageContainerStyle(index)}>
                <TouchableOpacity
                  style={styles.imageWrapper}
                  onPress={() => handleImageSelect(index)}>
                  <Image source={{uri: group[0]}} style={styles.image} />
                  {selectedGroupId === index && (
                    <View style={styles.imageOverlay} />
                  )}
                  <Text style={styles.imageCount}>{`${group.length} 장`}</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ))}
        </View>

        <AlbumPlus
          visible={plusVisible}
          onClose={() => setPlusVisible(false)}
          onAddAlbum={handleAddNewAlbum}
        />
      </ScrollView>
      <View style={styles.fixedFooter}>
        <TouchableOpacity onPress={handleNavigation}>
          <Image
            style={styles.done}
            source={require('../../assets/icon/done2.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
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
    margin: 10,
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
    marginHorizontal: '1%', // 좌우 간격 추가
  },
  imageWrapper: {
    position: 'relative',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
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
    height: '100%',
    borderRadius: 10,
  },
  done: {
    width: 120,
    top: 15,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
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
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 어두운 오버레이
    borderRadius: 10,
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

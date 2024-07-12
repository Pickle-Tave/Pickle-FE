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
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const route = useRoute();
  const {groupedImages} = route.params;
  const [items, setItems] = useState([]);
  const albumList = useSelector(state => state.AlbumListReducer.albumList);
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigation.navigate('Filter');
  };

  useEffect(() => {
    if (!albumList.last && albumList.first) dispatch(GetAlbumList(null, 50));
  }, [albumList]); // 앨범 목록 조회 요청을 한 번만 실행

  useEffect(() => {
    const newItems = albumList.map(album => ({
      label: album.searchedAlbumName,
      value: album.albumId,
    }));

    // '새 앨범 추가하기'가 이미 목록에 있는지 확인하고 없으면 추가
    const addNewAlbumItem = {label: '새 앨범 추가하기', value: 'add_new_album'};
    if (!newItems.some(item => item.value === 'add_new_album')) {
      newItems.push(addNewAlbumItem);
    }
    setItems(newItems);
  }, [albumList]); // albumList가 변경될 때만 실행

  const handleValueChange = async value => {
    if (value === 'add_new_album') {
      setPlusVisible(true);
    } else if (value) {
      setSelectedOption(value);
      await handleAlbumSelection(value, selectedImageIds); // 선택된 이미지 ID들과 함께 앨범 선택 함수를 호출
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
    const isSelected = selectedImageIds.includes(id);
    if (isSelected) {
      setSelectedImageIds(selectedImageIds.filter(imageId => imageId !== id));
    } else {
      setSelectedImageIds([...selectedImageIds, id]);
    }
  };

  // 이미지 컨테이너 스타일 변경
  const getImageContainerStyle = id => {
    const isSelected = selectedImageIds.includes(id);
    return {
      ...styles.imageContainer,
      borderColor: isSelected ? 'green' : 'transparent',
      borderWidth: isSelected ? 2 : 0,
      opacity: isSelected ? 0.7 : 1,
    };
  };

  // 이미지 그룹 선택할 때 호출 -> API 호출
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

      const data = await AlbumSave(requestBody); // 이미지 저장 API 호출
      console.log('앨범에 이미지 저장 성공', data);
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
              <View style={getImageContainerStyle(group.id)}>
                <TouchableOpacity
                  style={styles.imageWrapper}
                  onPress={() => handleImageSelect(group.id)}>
                  <Image source={{uri: group[0]}} style={styles.image} />
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

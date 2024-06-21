import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AlbumItem from '../components/AlbumItem';
import AlbumPlus from '../components/Modal/AlbumPlus';
import DropDownPicker from 'react-native-dropdown-picker';
import KebabModal from '../components/Modal/KebabModal';
import AlbumShareModal from '../components/Modal/AlbumShareModal';
import AlbumEditModal from '../components/Modal/AlbumEditModal';
import DeleteWarnModal from '../components/Modal/DeleteWarnModal';
import { useSelector, useDispatch } from 'react-redux';
import { addAlbum, deleteAlbum } from '../src/actions/AlbumAction';
import { addAlbumImage } from '../src/actions/AlbumImageAction';

const Album = ({ navigation }) => {
  const albumList = useSelector((state) => state.AlbumReducer);
  const dispatch = useDispatch();
  const albumImages = useSelector((state) => state.AlbumImageReducer);

  // 모달 visible state
  const [plusvisible, setPlusVisible] = useState(false);
  const [kebabvisible, setKebabVisible] = useState(false);
  const [editvisible, setEditVisible] = useState(false);
  const [sharevisible, setShareVisible] = useState(false);
  const [deletewarnvisible, setDeleteWarnVisible] = useState(false);

  const [albumId, setAlbumId] = useState(null); // 현재 수정할 앨범의 ID

  // 새로 생성될 앨범의 id값
  const maxAlbumId = Math.max(...albumList.map((album) => album.album_id));
  const [newAlbumId, setNewAlbumId] = useState(maxAlbumId + 1);

  useEffect(() => {
    setNewAlbumId(maxAlbumId + 1);
  }, [albumList]);

  // 드롭다운 열고 닫기
  const [open, setOpen] = useState(false);

  // 기본값을 설정할 수 있는 defaultValue 속성이 없어져 value를 초기화할 때 기본값을 지정해주었다.
  const [value, setValue] = useState(1);

  const [items, setItems] = useState([
    { label: '전체', value: 1 },
    { label: '개인앨범', value: 2 },
    { label: '공유앨범', value: 3 },
    { label: '즐겨찾기', value: 4 },
  ]);

  // 현재 선택된 값
  const [currentValue, setCurrentValue] = useState(1);

  // 드롭다운 메뉴를 선택할 때마다 값 변경
  const onChange = (value) => {
    setCurrentValue(value);
  };

  // 수정 버튼 클릭시 kebab 모달이 사라지고 share 모달이 뜸
  const ShareModal = () => {
    setKebabVisible(false);
    setShareVisible(true);
  };

  // 공유 버튼 클릭시 kebab 모달이 사라지고 edit 모달이 뜸
  const EditModal = (id) => {
    setKebabVisible(false);
    setAlbumId(id);
    setEditVisible(true);
  };

  const handleDeleteAlbum = () => {
    if (albumId !== null) {
      dispatch(deleteAlbum(albumId));
      setKebabVisible(false);
    }
  };

  const handleCopyAlbum = (albumId) => {
    const album = albumList.find((album) => album.album_id === albumId);
    if (album) {
      // 앨범 복제
      dispatch(addAlbum(newAlbumId, album.album_name, '개인앨범'));

      // 복제된 앨범에 속하는 이미지 복제
      const imagesToCopy = albumImages.filter((image) => image.album_id === albumId);
      imagesToCopy.forEach((image) => {
        dispatch(addAlbumImage(image.image_id, image.user_id, newAlbumId, image.src));
      });

      console.log('복제된 앨범 ID:', newAlbumId);
      console.log('복제된 이미지:', imagesToCopy);
    }
    setKebabVisible(false);
  };

  const DeleteWarn = () => {
    setKebabVisible(false);
    setDeleteWarnVisible(true);
  };

  const AlbumItemAccess = (id) => {
    navigation.navigate('AlbumInquiry', { id });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <AlbumPlus
        visible={plusvisible}
        newAlbumId={newAlbumId}
        onClose={() => setPlusVisible(false)}
      />
      <KebabModal
        visible={kebabvisible}
        onClose={() => setKebabVisible(false)}
        EditModal={() => EditModal(albumId)}
        ShareModal={ShareModal}
        DeleteAlbum={handleDeleteAlbum}
        DeleteWarn={DeleteWarn}
        CopyAlbum={() => handleCopyAlbum(albumId)} // 복제 기능 추가
      />
      <AlbumEditModal
        visible={editvisible}
        onClose={() => setEditVisible(false)}
        albumId={albumId}
      />
      <AlbumShareModal visible={sharevisible} onClose={() => setShareVisible(false)} />
      <DeleteWarnModal
        visible={deletewarnvisible}
        onClose={() => setDeleteWarnVisible(false)}
      />
      <View style={styles.search_section}>
        <TextInput style={styles.textinput} placeholder="앨범명을 입력하시오" />
        <TouchableOpacity>
          <Image
            style={styles.search_bar}
            source={require('../assets/icon/search.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.filter_section}>
        <DropDownPicker
          style={styles.dropdownpicker}
          containerStyle={styles.dropdownContainer}
          open={open}
          value={value}
          items={items}
          placeholder="전체"
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={onChange} // 값이 바뀔 때마다 실행
        />
      </View>
      <View style={styles.albumlist}>
        <FlatList
          data={albumList}
          keyExtractor={(item) => item.album_id.toString()}
          renderItem={({ item }) => (
            <AlbumItem
              {...item}
              kebabvisible={kebabvisible}
              setKebabVisible={setKebabVisible}
              AlbumItemAccess={() => AlbumItemAccess(item.album_id)}
              setAlbumId={setAlbumId} // AlbumItem에서 id를 설정할 수 있도록 함
            />
          )}
        />
      </View>
      <TouchableOpacity onPress={() => setPlusVisible(true)} style={styles.album_plus}>
        <Image
          style={styles.album_plus_image}
          source={require('../assets/icon/album_plus.png')}
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  search_section: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '91%',
    marginTop: 20,
    height: 38,
  },
  textinput: {
    width: '85%',
    marginHorizontal: 4,
    paddingVertical: 5,
    fontSize: 12,
  },
  filter_section: {
    marginTop: 15,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  albumlist: {
    width: '95%',
    marginBottom: 190,
  },
  album_plus: {
    position: 'absolute',
    bottom: 100,
    right: 40,
  },
  album_plus_image: {
    width: 45,
    height: 45,
  },
  search_bar: {
    width: 20,
    height: 20,
  },
  dropdownpicker: {
    borderRadius: 20,
    maxHeight: 40,
    minHeight: 32,
  },
  dropdownContainer: {
    width: 105, // 필요에 따라 조정
    maxHeight: 40,
  },
});

export default Album;

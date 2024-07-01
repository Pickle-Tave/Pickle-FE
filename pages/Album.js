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
  ActivityIndicator
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
import { GetAlbumList } from '../api/GetAlbumList';
import { InitializeAlbumList } from '../src/actions/AlbumListAction';
import { SearchAlbumName } from '../api/SearchAlbumName';
import { InitializeSearchedAlbum } from '../src/actions/SearchedAlbumAction';

const Album = ({ navigation }) => {
  const albumList = useSelector((state) => state.AlbumReducer);

  //API연동부분
  const dispatch = useDispatch();
  const AlbumList = useSelector((state) => state.AlbumListReducer)

  const albumImages = useSelector((state) => state.AlbumImageReducer);

  // 모달 visible state
  const [plusvisible, setPlusVisible] = useState(false);
  const [kebabvisible, setKebabVisible] = useState(false);
  const [editvisible, setEditVisible] = useState(false);
  const [sharevisible, setShareVisible] = useState(false);
  const [deletewarnvisible, setDeleteWarnVisible] = useState(false);

  // 로딩 상태를 나타내기 위한 변수
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 현재 선택된 앨범 id
  const [checkedAlbumId, setcheckedAlbumId] = useState(null);

  // 새로 생성될 앨범의 id값
  const maxAlbumId = Math.max(...albumList.map((album) => album.album_id));
  const [newAlbumId, setNewAlbumId] = useState(maxAlbumId + 1);

  // 검색 입력 값을 관리하는 상태 변수
  const [searchQuery, setSearchQuery] = useState('');

  //검색된 앨범 정보
  const searchedAlbumList = useSelector((state) => state.SearchedAlbumReducer);
  console.log('현재 검색된 앨범정보요!', searchedAlbumList);


  // 검색 중인지 여부를 나타내는 상태 변수
  const [isSearching, setIsSearching] = useState(false);
  // 마지막으로 검색한 쿼리를 저장하는 상태 변수
  const [lastSearchQuery, setLastSearchQuery] = useState('');

  //처음 마운트될때 앨범목록을 얻기 위한 첫번째 요청 부분
  useEffect(() => {
    //마지막이 아니면서 처음 요청일때
    if (!AlbumList.last && AlbumList.first) {
      console.log("처음 요청이 들어가는 중")
      dispatch(GetAlbumList(null, 10));
    }
  }, []);

  // 추가 데이터 요청 함수
  const fetchMoreAlbums = () => {
    if (isLoadingMore) {
      return; // 이미 로딩 중인 경우 추가 요청 방지
    }

    if (AlbumList.last) {
      return; // 이미 마지막 페이지에 도달한 경우 추가 요청 방지
    }

    setIsLoadingMore(true); // 로딩 시작

    dispatch(GetAlbumList(AlbumList.lastAlbumId, 10))
      .then(() => setIsLoadingMore(false)) // 로딩 완료
      .catch((error) => {
        setIsLoadingMore(false); // 에러 발생 시 로딩 해제
        console.error('앨범 목록 추가 요청 에러:', error);
      });
  };

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
  const EditModal = () => {
    setKebabVisible(false);
    // setAlbumId(id);
    setEditVisible(true);
  };

  const handleDeleteAlbum = () => {
    if (checkedAlbumId !== null) {
      dispatch(deleteAlbum(checkedAlbumId));
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


  const handleAlbumSearch = () => {
    if (searchQuery.trim() && !isSearching && searchQuery !== lastSearchQuery) {

        setIsSearching(true); //검색중
        setLastSearchQuery(searchQuery);

        // dispatch(InitializeSearchedAlbum());
        // dispatch(SearchAlbumName(searchQuery, searchedAlbumList.lastAlbumId, 10));
        navigation.navigate('SearchedAlbum', { searchQuery, isSearching });
        setSearchQuery('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <AlbumPlus
        visible={plusvisible}
        onClose={() => setPlusVisible(false)}
      />
      <KebabModal
        visible={kebabvisible}
        onClose={() => setKebabVisible(false)}
        EditModal={() => EditModal(checkedAlbumId)}
        ShareModal={ShareModal}
        DeleteAlbum={handleDeleteAlbum}
        DeleteWarn={DeleteWarn}
        CopyAlbum={() => handleCopyAlbum(checkedAlbumId)} // 복제 기능 추가
      />
      <AlbumEditModal
        visible={editvisible}
        onClose={() => setEditVisible(false)}
        checkedAlbumId={checkedAlbumId}
      />
      <AlbumShareModal visible={sharevisible} onClose={() => setShareVisible(false)} />
      <DeleteWarnModal
        visible={deletewarnvisible}
        onClose={() => setDeleteWarnVisible(false)}
      />
      <View style={styles.search_section}>
        <TextInput
          style={styles.textinput}
          placeholder="앨범명을 입력하시오"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={handleAlbumSearch}>
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
          data={AlbumList.albumList}
          keyExtractor={(item) => item.albumId.toString()}
          renderItem={({ item }) => (
            <AlbumItem
              {...item}
              kebabvisible={kebabvisible}
              setKebabVisible={setKebabVisible}
              AlbumItemAccess={() => AlbumItemAccess(item.albumId)}
              setAlbumId={setcheckedAlbumId} // AlbumItem에서 id를 설정할 수 있도록 함
            />
          )}
          onEndReached={fetchMoreAlbums} // 끝에 도달하면 추가 데이터 요청
          onEndReachedThreshold={0.1} // 끝에서 얼마나 멀리 있을 때 호출할 지 비율로 설정
          ListFooterComponent={() => ( // 로딩 중임을 나타내는 컴포넌트
            isLoadingMore && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="gray" />
              </View>
            )
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

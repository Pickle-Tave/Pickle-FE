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
import AlbumPasswordModal from '../components/Modal/AlbumPasswordModal';
import AlbumShareModal from '../components/Modal/AlbumShareModal';
import AlbumEditModal from '../components/Modal/AlbumEditModal';
import DeleteWarnModal from '../components/Modal/DeleteWarnModal';
import { useSelector, useDispatch } from 'react-redux';
import { addAlbum, deleteAlbum } from '../src/actions/AlbumAction';
import { addAlbumImage } from '../src/actions/AlbumImageAction';
import { GetAlbumList } from '../api/GetAlbumList';
import { InitializeAlbumList } from '../src/actions/AlbumListAction';
import { InitializeSearchedAlbum } from '../src/actions/SearchedAlbumAction';
import { SearchAlbumLike } from '../api/SearchAlbumLike';
import { InitializeLikeList } from '../src/actions/AlbumLikeAction';
import { SearchAlbumStatus } from '../api/SearchAlbumStatus';
import { InitializeAlbumStatus } from '../src/actions/AlbumStatusAction';

const Album = ({ navigation, route }) => {
  const albumList = useSelector((state) => state.AlbumReducer);

  //API연동부분
  const dispatch = useDispatch();
  const AlbumList = useSelector((state) => state.AlbumListReducer); //사용자 앨범 목록
  const LikeList = useSelector((state) => state.AlbumLikeReducer); //즐겨찾기 앨범 목록
  const StatusList = useSelector((state) => state.AlbumStatusReducer); //앨범 상태 목록(개인앨범 혹은 공유앨범)

  const albumImages = useSelector((state) => state.AlbumImageReducer);

  // 모달 visible state
  const [plusvisible, setPlusVisible] = useState(false);
  const [kebabvisible, setKebabVisible] = useState(false);
  const [editvisible, setEditVisible] = useState(false);
  const [sharevisible, setShareVisible] = useState(false);
  const [deletewarnvisible, setDeleteWarnVisible] = useState(false);
  const [passwordvisible, setPasswordVisible] = useState(false);

  // 로딩 상태를 나타내기 위한 변수
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 현재 선택된 앨범 id
  const [checkedAlbumId, setcheckedAlbumId] = useState(null);

  // 새로 생성될 앨범의 id값
  const maxAlbumId = Math.max(...albumList.map((album) => album.album_id));
  const [newAlbumId, setNewAlbumId] = useState(maxAlbumId + 1);

  // 검색 입력 값을 관리하는 상태 변수
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 중인지 여부를 나타내는 상태 변수
  const [isSearching, setIsSearching] = useState(false);

  //딥링크의 link값 
  const [link, setLink] = useState('');

  // 드롭다운 열고 닫기
  const [open, setOpen] = useState(false);

  // 드롭다운 값
  const [value, setValue] = useState(1);

  const [items, setItems] = useState([
    { label: '전체', value: 1 },
    { label: '개인앨범', value: 2 },
    { label: '공유앨범', value: 3 },
    { label: '즐겨찾기', value: 4 },
  ]);

  // 현재 선택된 값
  const [currentValue, setCurrentValue] = useState(1);

  useEffect(() => {
    fetchAlbumData(value);
  }, [value]);


  //딥링크를 통해 접속할시 비밀번호 입력 모달 띄우기
  useEffect(() => {
    if (route.params?.link) {
      setLink(route.params.link); // 딥링크 URL에서 link 파라미터 추출
      setModalVisible(true); // 모달 열기
    }
  }, [route.params?.link]);

  const fetchAlbumData = (value) => {
    if (value === 1) {
      dispatch(InitializeAlbumList());
      if (!AlbumList.last && AlbumList.first) {
        console.log("전체 앨범 요청이 들어가는 중");
        dispatch(GetAlbumList(null, 10));
      }
    } else if (value === 2) {
      dispatch(InitializeAlbumStatus());
      if (!StatusList.last && StatusList.first) {
        console.log("개인앨범 검색이 들어가는 중");
        dispatch(SearchAlbumStatus('PRIVATE', null, 10));
      }
    } else if (value === 3) {
      dispatch(InitializeAlbumStatus());
      if (!StatusList.last && StatusList.first) {
        console.log("공유앨범 검색이 들어가는 중");
        dispatch(SearchAlbumStatus('PUBLIC', null, 10));
      }
    } else if (value === 4) {
      dispatch(InitializeLikeList());
      if (!LikeList.last && LikeList.first) {
        console.log("즐겨찾기 요청이 들어가는 중");
        dispatch(SearchAlbumLike(null, 10));
      }
    }
  };

  //드롭다운 값에 따라 렌더링할 데이터
  const renderData = () => {
    if (value === 1) {
      return AlbumList.albumList;
    } else if (value === 2 || value === 3) {
      return StatusList.statusList;
    } else if (value === 4) {
      return LikeList.likeList;
    }
  };

  const currentList = () => {
    if (value === 1) {
      return AlbumList;
    } else if (value === 2 || value === 3) {
      return StatusList;
    } else {
      return LikeList;
    }
  };

  // 추가 데이터 요청 함수
  const fetchMoreAlbums = () => {
    if (isLoadingMore) {
      return; // 이미 로딩 중인 경우 추가 요청 방지
    }

    if (currentList().last) {
      return; // 이미 마지막 페이지에 도달한 경우 추가 요청 방지
    }

    setIsLoadingMore(true); // 로딩 시작

    const action = () => {
      if (value === 1) {
        return dispatch(GetAlbumList(currentList().lastAlbumId, 10));
      } else if (value === 2) {
        return dispatch(SearchAlbumStatus('PRIVATE', currentList().lastAlbumId, 10));
      } else if (value === 3) {
        return dispatch(SearchAlbumStatus('PUBLIC', currentList().lastAlbumId, 10));
      } else {
        return dispatch(SearchAlbumLike(currentList().lastAlbumId, 10));
      }
    };

    action()
      .then(() => setIsLoadingMore(false)) // 로딩 완료
      .catch((error) => {
        setIsLoadingMore(false); // 에러 발생 시 로딩 해제
        console.error('앨범 목록 추가 요청 에러:', error);
      });
  };

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
    console.log("searchQuery", searchQuery);
    console.log("isSearching", isSearching);

    if (searchQuery.trim() && !isSearching) {
      console.log("검색하는 중");
      dispatch(InitializeSearchedAlbum());
      setIsSearching(true);
      navigation.navigate('SearchedAlbum', { searchQuery, isSearching });
      setSearchQuery('');
      setIsSearching(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <AlbumPasswordModal 
      visible={passwordvisible}
      link={link}
      />
      <AlbumPlus
        visible={plusvisible}
        onClose={() => setPlusVisible(false)}
        dropdownValue={value}
      />
      <KebabModal
        visible={kebabvisible}
        onClose={() => setKebabVisible(false)}
        EditModal={() => EditModal(checkedAlbumId)}
        ShareModal={ShareModal}
        DeleteAlbum={handleDeleteAlbum}
        DeleteWarn={DeleteWarn}
        CopyAlbum={() => handleCopyAlbum(checkedAlbumId)}
        checkedAlbumId={checkedAlbumId}
        dropdownValue={value}
      />
      <AlbumEditModal
        visible={editvisible}
        onClose={() => setEditVisible(false)}
        checkedAlbumId={checkedAlbumId}
        dropdownValue={value}
      />
      <AlbumShareModal
        visible={sharevisible}
        onClose={() => setShareVisible(false)}
        checkedAlbumId={checkedAlbumId}
        dropdownValue={value}
      />
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
          data={renderData()}
          keyExtractor={(item) => item.albumId.toString()}
          renderItem={({ item }) => (
            <AlbumItem
              {...item}
              kebabvisible={kebabvisible}
              setKebabVisible={setKebabVisible}
              AlbumItemAccess={() => AlbumItemAccess(item.albumId)}
              setAlbumId={setcheckedAlbumId} // AlbumItem에서 id를 설정할 수 있도록 함
              dropdownValue={value}
              albumName={item.searchedAlbumName}
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
    marginBottom: 180,
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

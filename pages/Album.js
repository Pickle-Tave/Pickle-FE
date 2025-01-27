import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
import SelectAlbumStatus from '../components/Modal/SelectAlbumStatus';
import { useSelector, useDispatch } from 'react-redux';
import { GetAlbumList } from '../api/GetAlbumList';
import { InitializeAlbumList } from '../src/actions/AlbumListAction';
import { InitializeSearchedAlbum } from '../src/actions/SearchedAlbumAction';
import { SearchAlbumLike } from '../api/SearchAlbumLike';
import { InitializeLikeList } from '../src/actions/AlbumLikeAction';
import { SearchAlbumStatus } from '../api/SearchAlbumStatus';
import { InitializeAlbumStatus } from '../src/actions/AlbumStatusAction';
import { InitializeAlbumImages } from '../src/actions/AlbumImageAction';

const Album = ({ navigation }) => {
  const dispatch = useDispatch();

  const AlbumList = useSelector((state) => state.AlbumListReducer); //사용자 앨범 목록
  const LikeList = useSelector((state) => state.AlbumLikeReducer); //즐겨찾기 앨범 목록
  const StatusList = useSelector((state) => state.AlbumStatusReducer); //앨범 상태 목록(개인앨범 혹은 공유앨범)

  // 모달 visible state
  const [plusvisible, setPlusVisible] = useState(false);
  const [kebabvisible, setKebabVisible] = useState(false);
  const [editvisible, setEditVisible] = useState(false);
  const [sharevisible, setShareVisible] = useState(false);
  const [passwordvisible, setPasswordVisible] = useState(false);
  const [selectvisible, setSelectVisible] = useState(false);

  // 로딩 상태를 나타내기 위한 변수
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // 검색 중인지 여부를 나타내는 상태 변수
  const [isSearching, setIsSearching] = useState(false);

  // 현재 선택된 앨범 id
  const [checkedAlbumId, setcheckedAlbumId] = useState(null);

  // 검색 입력 값을 관리하는 상태 변수
  const [searchQuery, setSearchQuery] = useState('');

  // 드롭다운 열고 닫기
  const [open, setOpen] = useState(false);

  // 드롭다운 값
  const [value, setValue] = useState(1);

  // 드롭다운 메뉴를 선택할 때마다 값 변경
  const onChange = (value) => {
    setValue(value);
  };

  const [items, setItems] = useState([
    { label: '전체', value: 1 },
    { label: '개인앨범', value: 2 },
    { label: '공유앨범', value: 3 },
    { label: '즐겨찾기', value: 4 },
  ]);

  useFocusEffect(
    useCallback(() => {
      console.log("값변경으로 인한 초기화")
      dispatch(InitializeAlbumList());
      dispatch(InitializeAlbumStatus());
      dispatch(InitializeLikeList());

      fetchAlbumData(value);
    }, [value])
  );

  useFocusEffect(
    useCallback(() => {
      console.log("값초기화2")
      dispatch(InitializeAlbumImages());
      dispatch(InitializeAlbumList());
      dispatch(InitializeAlbumStatus());
      dispatch(InitializeLikeList());
    }, [])
  )

  const fetchAlbumData = (value) => {
    if (value === 1) {
      console.log("전체앨범", AlbumList.first, AlbumList.last)
      if (!AlbumList.last && AlbumList.first) {
        console.log("전체 앨범 요청이 들어가는 중");
        dispatch(GetAlbumList(null, 10));
      }
    } else if (value === 2) {
      console.log("개인앨범", StatusList.first, StatusList.last)
      if (!StatusList.last && StatusList.first) {
        console.log("개인앨범 검색이 들어가는 중");
        dispatch(SearchAlbumStatus('PRIVATE', null, 10));
      }
    } else if (value === 3) {
      console.log("공유앨범", StatusList.first, StatusList.last)
      if (!StatusList.last && StatusList.first) {
        console.log("공유앨범 검색이 들어가는 중");
        dispatch(SearchAlbumStatus('PUBLIC', null, 10));
      }
    } else if (value === 4) {
      console.log("즐겨찾기", LikeList.first, StatusList.last)
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
      return; 
    }

    if (currentList().last) {
      return;
    }

    setIsLoadingMore(true); 

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
      .then(() => setIsLoadingMore(false)) 
      .catch((error) => {
        setIsLoadingMore(false); 
      });
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

  const PrivateAlbum = () => {
    setSelectVisible(false);
    setPlusVisible(true);
  }

  const PublicAlbum = () => {
    setSelectVisible(false);
    setPasswordVisible(true);
  }

  const AlbumItemAccess = (id) => {
    navigation.navigate('AlbumInquiry', { id });
  };

  //앨범 검색시
  const handleAlbumSearch = () => {
    console.log("searchQuery", searchQuery);
    console.log("isSearching", isSearching);

    if (searchQuery.trim() && !isSearching) {
      console.log("앨범 검색하는 중");
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
      <SelectAlbumStatus
        visible={selectvisible}
        onClose={() => setSelectVisible(false)}
        PrivateAlbum={PrivateAlbum}
        PublicAlbum={PublicAlbum}
      />
      <AlbumPasswordModal
        visible={passwordvisible}
        onClose={() => setPasswordVisible(false)}
        dropdownValue={value}
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
      <View style={styles.search_section}>
        <TextInput
          style={styles.textinput}
          placeholder="앨범명을 입력하시오"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleAlbumSearch}
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
          onChangeValue={onChange} 
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
              setAlbumId={setcheckedAlbumId}
              dropdownValue={value}
              albumName={item.searchedAlbumName}
            />
          )}
          onEndReached={fetchMoreAlbums} 
          onEndReachedThreshold={0.1} 
          ListFooterComponent={() => ( 
            isLoadingMore && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="gray" style={{height: 60}} />
              </View>
            )
          )}
        />
      </View>
      <TouchableOpacity onPress={() => setSelectVisible(true)} style={styles.album_plus}>
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
    width: 105, 
    maxHeight: 40,
  },
});

export default Album;

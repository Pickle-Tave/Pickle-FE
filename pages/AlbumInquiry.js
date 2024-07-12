import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import AlbumAccess from "../components/AlbumAccess";
import { useSelector, useDispatch } from "react-redux";
import { GetAlbumInquiry } from '../api/GetAlbumInquiry';
import { InitializeAlbumImages } from '../src/actions/AlbumImageAction';

const AlbumInquiry = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params; // 현재 앨범의 id값
  const albumImages = useSelector((state) => state.AlbumImageReducer)

  // useSelector를 사용하여 AlbumListReducer에서 상태 가져오기
  const albumList = useSelector((state) => state.AlbumListReducer.albumList);

  // 현재 조회하고 있는 앨범 정보(id, 이름, type 등..)
  const currentAlbum = albumList.find((album) => album.albumId === id);

  // 현재 조회된 앨범의 이미지 정보(확인할 것)(이미지리스트-id, 해시태그, url)
  const currentimageList = useSelector(state => state.AlbumImageReducer.imageList);

  //해시태그 검색어
  const [searchHashtag, setSearchHashtag] = useState('');

  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);

  // 검색 중인지 여부를 나타내는 상태 변수
  const [isSearching, setIsSearching] = useState(false);

  //해시태그 검색시
  const handleHashtagSearch = () => {
    if (searchHashtag.trim() && !isSearching) {
      console.log("해시태그 검색하는 중")
    }
    //dispatch로 해시태그 검색 초기화하기
    setIsSearching(true);
    navigation.navigate('SearchHashTag', { searchHashtag, isSearching })
    setSearchHashtag('');
    setIsSearching(false);
  }

  useEffect(() => {
    dispatch(InitializeAlbumImages());
    console.log("이미지 첫 요청이 들어가는 중")
    if (!albumImages.last && albumImages.first) {
      dispatch(GetAlbumInquiry(null, 50, id)) // 액션 크리에이터로 호출
        .then(() => {
          setLoading(false); // 액션 완료 후 로딩 상태 변경
          if (albumImages.imageList.length === 0) {
            setLoading(false); // 이미지 리스트가 빈 배열인 경우 로딩 멈춤
          }
        })
        .catch(() => setLoading(false)); // 에러 발생 시도 로딩 상태 변경
    } else {
      setLoading(false); // 이미지 리스트가 이미 로딩된 경우 로딩 멈춤
    }
  }, [id]);

  // 선택버튼이 눌렸는지 여부
  const [check, setCheck] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.search_section}>
        <TextInput
          style={styles.textinput}
          placeholder='#해시태그'
          searchHashtag={searchHashtag}
          onChangeText={(text) => setSearchHashtag(text)}
        />
        <TouchableOpacity onPress={handleHashtagSearch}>
          <Image
            style={styles.search_bar}
            source={require('../assets/icon/search.png')}
          />
        </TouchableOpacity>
      </View>
      {/* 로딩 중일 때 표시될 컴포넌트 */}
      {loading ? (
        <ActivityIndicator style={styles.loadingContainer} size="large" color="#769370" />
      ) : (
        <AlbumAccess check={check} setCheck={setCheck} {...currentAlbum} albumId={id} {...currentimageList} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
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
    fontSize: 12,
  },
  search_bar: {
    width: 20,
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlbumInquiry;

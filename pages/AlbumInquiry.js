import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import AlbumAccess from "../components/AlbumAccess";
import { useSelector, useDispatch } from "react-redux";
import { GetAlbumInquiry } from '../api/GetAlbumInquiry';
import { InitializeAlbumImages } from '../src/actions/AlbumImageAction';
import { InitializeSearchedHashtag } from '../src/actions/SearchHashtagAction';

const AlbumInquiry = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params; // 현재 앨범의 id값
  const albumImages = useSelector((state) => state.AlbumImageReducer)

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
  const handleHashtagSearch = async () => {
    if (searchHashtag.trim() && !isSearching) {
      setIsSearching(true);
      dispatch(InitializeSearchedHashtag());
      navigation.navigate('SearchHashTag', { searchHashtag, isSearching, id });
      setSearchHashtag(''); 
      setIsSearching(false); 
    }
  }

  useEffect(() => {
    dispatch(InitializeAlbumImages())
    
    console.log('값확인',albumImages.last, albumImages.first)
    if (!albumImages.last && albumImages.first) {
      console.log("이미지 첫 요청이 들어가는 중")
      dispatch(GetAlbumInquiry(null, 50, id)) 
        .then(() => {
          setLoading(false); 
          if (albumImages.imageList.length === 0) {
            setLoading(false); 
          }
        })
        .catch(() => setLoading(false)); 
    } else {
      setLoading(false);
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
          value={searchHashtag} 
          onChangeText={(text) => setSearchHashtag(text)}
          onSubmitEditing={handleHashtagSearch}
        />
        <TouchableOpacity onPress={handleHashtagSearch}>
          <Image
            style={styles.search_bar}
            source={require('../assets/icon/search.png')}
          />
        </TouchableOpacity>
      </View>
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

import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AlbumItem from '../components/AlbumItem';
import AlbumPlus from '../components/Modal/AlbumPlus';
import DropDownPicker from 'react-native-dropdown-picker';
import KebabModal from '../components/Modal/KebabModal';
import AlbumShareModal from '../components/Modal/AlbumShareModal';
import AlbumEditModal from '../components/Modal/AlbumEditModal';

const mockData = [
  {
    id: 1,
    title: '일본여행',
    type: '개인앨범',
  },
  {
    id: 2,
    title: '미국여행',
    type: '공유앨범',
  },
  {
    id: 3,
    title: '강아지',
    type: '개인앨범',
  },
  {
    id: 4,
    title: '셀카',
    type: '공유앨범',
  },
  {
    id: 5,
    title: '풍경',
    type: '개인앨범',
  },
];

const Album = ({navigation}) => {
  const [albumlist, setAlbumList] = useState(mockData);

  // 모달 visible state
  const [plusvisible, setPlusVisible] = useState(false);
  const [kebabvisible, setKebabVisible] = useState(false);
  const [editvisible, setEditVisible] = useState(false);
  const [sharevisible, setShareVisible] = useState(false);

  // 드롭다운 열고 닫기
  const [open, setOpen] = useState(false);

  // 기본값을 설정할 수 있는 defaultValue 속성이 없어져 value를 초기화할 때 기본값을 지정해주었다.
  const [value, setValue] = useState(1);

  const [items, setItems] = useState([
    {label: '전체', value: 1},
    {label: '개인앨범', value: 2},
    {label: '공유앨범', value: 3},
  ]);

  // 현재 선택된 값
  const [currentValue, setCurrentValue] = useState(1);

  // 드롭다운 메뉴를 선택할 때마다 값 변경
  const onChange = value => {
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

  return (
    <View style={styles.container}>
      <AlbumPlus visible={plusvisible} onClose={() => setPlusVisible(false)} />
      <KebabModal
        visible={kebabvisible}
        onClose={() => setKebabVisible(false)}
        EditModal={EditModal}
        ShareModal={ShareModal}
      />
      <AlbumEditModal
        visible={editvisible}
        onClose={() => setEditVisible(false)}
      />
      <AlbumShareModal
        visible={sharevisible}
        onClose={() => setShareVisible(false)}
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
          data={albumlist}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AlbumInquiry', {id: item.id})
              }>
              <AlbumItem
                {...item}
                kebabvisible={kebabvisible}
                setKebabVisible={setKebabVisible}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => setPlusVisible(true)}
        style={styles.album_plus}>
        <Image
          style={styles.album_plus_image}
          source={require('../assets/icon/album_plus.png')}
        />
      </TouchableOpacity>
    </View>
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
    width: '90%',
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
  },
  album_plus: {
    position: 'absolute',
    bottom: 100,
    right: 30,
  },
  album_plus_image: {
    width: 50,
    height: 50,
  },
  search_bar: {
    width: 20,
    height: 20,
  },
  dropdownpicker: {
    borderRadius: 20,
    maxHeight: 40,
    minHeight: 35,
  },
  dropdownContainer: {
    width: 105, // 필요에 따라 조정
    maxHeight: 40,
  },
});

export default Album;

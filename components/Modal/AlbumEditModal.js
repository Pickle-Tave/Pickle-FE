import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AlbumEdit } from '../../api/AlbumEdit';
import { InitializeAlbumList } from '../../src/actions/AlbumListAction';
import { GetAlbumList } from '../../api/GetAlbumList';
import { SearchAlbumStatus } from '../../api/SearchAlbumStatus';
import { InitializeAlbumStatus } from '../../src/actions/AlbumStatusAction';
import { InitializeSearchedAlbum } from '../../src/actions/SearchedAlbumAction';
import { SearchAlbumName } from '../../api/SearchAlbumName';

const AlbumEditModal = ({ visible, onClose, checkedAlbumId, onUpdate, dropdownValue, searchQuery }) => {
  const dispatch = useDispatch();

  const album = useSelector((state) =>
    state.AlbumReducer.find((album) => album.album_id === checkedAlbumId)
  );

  const editedAlbum = useSelector((state) =>
    state.AlbumListReducer.albumList.find((item) => item.albumId === checkedAlbumId));

  //새로 수정할 앨범명
  const [newAlbumName, setNewAlbumName] = useState('');

  useEffect(() => {
    if (album) {
      setNewAlbumName(album.album_name);
    }
  }, [album]);

  const handleUpdateAlbumName = () => {
    if (newAlbumName.trim() !== '') {
      AlbumEdit(editedAlbum.albumId, newAlbumName)
        .then(() => {
          dispatch(InitializeAlbumList());
          dispatch(GetAlbumList(null, 10));

          if (searchQuery) {
            dispatch(InitializeSearchedAlbum());
            dispatch(SearchAlbumName(searchQuery, null, 10));
          }

          // onUpdate(); // 앨범 수정 후 `onUpdate` 콜백 호출
          console.log("dropdownValue", dropdownValue)
          if (dropdownValue === 2) {
            dispatch(InitializeAlbumStatus());
            dispatch(SearchAlbumStatus('PRIVATE', null, 10));
          } else if (dropdownValue === 3) {
            dispatch(InitializeAlbumStatus());
            dispatch(SearchAlbumStatus('PUBLIC', null, 10));
          }

          onClose();
        })
        .catch((error) => console.error('앨범 수정 오류:', error));
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true} // 배경을 투명하게 설정
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>앨범 수정하기</Text>
              <Text style={styles.modalSubTitle}>
                앨범의 이름을 입력하세요.
              </Text>
              {editedAlbum && (
                <TextInput
                  style={styles.text_input}
                  value={newAlbumName}
                  onChangeText={setNewAlbumName}
                  placeholder={`${editedAlbum.searchedAlbumName}`}
                />
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.modalButtonContainer1}>
                  <Text style={styles.modalButton}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleUpdateAlbumName}
                  style={styles.modalButtonContainer2}>
                  <Text style={styles.modalButton}>완료</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명하게 설정
  },
  modalContainer: {
    width: '85%', // 모달 너비 설정
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    borderColor: '#F7F8CB',
    borderWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    color: 'black',
  },
  modalSubTitle: {
    fontSize: 16,
    marginBottom: 10,
    alignItems: 'center',
    color: 'black',
    marginTop: 3,
  },
  text_input: {
    height: 38,
    borderWidth: 1,
    width: '90%',
    borderRadius: 30,
    paddingLeft: 15,
    marginTop: 6,
    fontSize: 13,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
  },
  modalButtonContainer1: {
    width: '50%', // 너비를 50%로 설정
    height: '100%',
    alignItems: 'center', // 중앙 정렬
    marginTop: 10,
    paddingTop: 5,
    borderRightColor: '#CCCCCC',
    borderRightWidth: 1,
  },
  modalButtonContainer2: {
    width: '50%', // 너비를 50%로 설정
    alignItems: 'center', // 중앙 정렬
    paddingTop: 15,
  },
  modalButton: {
    fontSize: 16,
    color: 'black',
  },
});

export default AlbumEditModal;

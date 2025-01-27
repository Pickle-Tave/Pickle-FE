import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AlbumCreate } from '../../api/AlbumCreate';
import { GetAlbumList } from '../../api/GetAlbumList';
import { InitializeAlbumList } from '../../src/actions/AlbumListAction';
import { InitializeAlbumStatus } from '../../src/actions/AlbumStatusAction';
import { SearchAlbumStatus } from '../../api/SearchAlbumStatus';
import { InitializeLikeList } from '../../src/actions/AlbumLikeAction';
import { SearchAlbumLike } from '../../api/SearchAlbumLike';


const AlbumPlus = ({ visible, onClose, dropdownValue }) => {
  const dispatch = useDispatch();

  //새로 추가할 앨범명
  const [newAlbumName, setNewAlbumName] = useState('');

  const handleAddAlbum = async () => {
    try {
      await AlbumCreate(newAlbumName);
      setNewAlbumName('');

      dispatch(InitializeAlbumList());
      dispatch(GetAlbumList(null, 10)); 
      if (dropdownValue === 2) {
        dispatch(SearchAlbumStatus('PRIVATE', null, 10));
        dispatch(InitializeAlbumStatus());
      } else if (dropdownValue === 3) {
        dispatch(SearchAlbumStatus('PUBLIC', null, 10));
        dispatch(InitializeAlbumStatus());
      } else if (dropdownValue === 4) {
        dispatch(InitializeLikeList());
        dispatch(SearchAlbumLike(null, 10))
      }
      onClose();
    } catch (error) {
      console.error('앨범 생성 중 오류:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true} 
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>새로운 앨범</Text>
              <Text style={styles.modalSubTitle}>
                앨범의 이름을 입력하세요.
              </Text>
              <TextInput
                style={styles.text_input}
                placeholder="제목"
                value={newAlbumName}
                onChangeText={setNewAlbumName}
                onSubmitEditing={handleAddAlbum}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.modalButtonContainer1}>
                  <Text style={styles.modalButton}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAddAlbum}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
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
    marginBottom: 17,
    alignItems: 'center',
    color: 'black',
    marginTop: 7,
  },
  modalSubTitle: {
    fontSize: 16,
    marginBottom: 16,
    alignItems: 'center',
    color: 'black',
  },
  text_input: {
    height: 38,
    borderWidth: 1,
    width: '90%',
    borderRadius: 30,
    paddingLeft: 15,
    marginTop: 6,
    fontSize: 13,
    marginBottom: 16,
    paddingVertical: 5, 
    lineHeight: 20,
    fontSize: 14, 
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
    width: '50%',
    height: '100%',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 5,
    borderRightColor: '#CCCCCC',
    borderRightWidth: 1,
  },
  modalButtonContainer2: {
    width: '50%',
    alignItems: 'center',
    paddingTop: 15,
  },
  modalButton: {
    fontSize: 16,
    color: 'black',
  },
});

export default AlbumPlus;

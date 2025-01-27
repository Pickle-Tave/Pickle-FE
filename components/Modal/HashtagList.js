import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HashTagListCheck } from '../../api/HashTagListCheck';

const HashtagList = ({ visible, onClose }) => {

  const dispatch = useDispatch();
  const hashtagList = useSelector((state) => state.HashTagReducer.hashtagList);
  console.log('나의 해시태그 목록:', hashtagList);

  useEffect(() => {
    if (visible) {
      dispatch(HashTagListCheck());
    }
  }, [dispatch, visible]);

  const renderHashTagItem = (item) => (
    <View style={styles.hashItem} key={item.id.toString()}>
      <Text style={styles.hashText}>{`#${item.text}`}</Text>
    </View>
  );

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
              <Text style={styles.modalTitle}>해시태그 목록</Text>
              <ScrollView
                contentContainerStyle={styles.hashList}
                showsVerticalScrollIndicator={false}
              >
                {hashtagList.length === 0 ? (
                  <View style={styles.emptyMessageContainer}>
                    <Text style={styles.emptyMessageText}>설정된 해시태그가 없습니다</Text>
                  </View>
                ) : (
                  hashtagList.map(renderHashTagItem)
                )}
              </ScrollView>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.modalButtonContainer1}>
                  <Text style={styles.modalButton}>취소</Text>
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
    padding: 20,
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
    marginTop: 7,
    alignItems: 'center',
    color: 'black',
  },
  hashList: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 15,
  },
  hashItem: {
    marginHorizontal: 8,
    marginVertical: 4,
    alignItems: 'center', 
  },
  hashText: {
    fontSize: 15,
    flexShrink: 1,
  },
  emptyMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyMessageText: {
    fontSize: 15,
    color: 'gray',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 16,
  },
  modalButtonContainer1: {
    alignItems: 'center', 
  },
  modalButton: {
    fontSize: 16,
    color: 'black',
  },
});

export default HashtagList;

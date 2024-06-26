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
      dispatch(HashTagListCheck()); // 액션 크리에이터로 호출
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
      animationType="slide"
      transparent={true} // 배경을 투명하게 설정
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>해시태그 목록</Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.hashList}
                showsHorizontalScrollIndicator={false}
              >
                {hashtagList.map(renderHashTagItem)}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명하게 설정
  },
  modalContainer: {
    width: '85%', // 모달 너비 설정
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
    alignItems: 'center',
    color: 'black',
  },
  hashList: {
    flexDirection: 'row', // 가로로 배치
    paddingVertical: 15,
    justifyContent: 'flex-start', // 가로축 기준 왼쪽 정렬
    alignItems: 'center', // 세로축 기준 중앙 정렬
  },
  hashItem: {
    marginHorizontal: 8, // 해시태그 간 간격 추가
    marginVertical: 4, // 세로 간격 추가
    alignItems: 'center', // 중앙 정렬
  },
  hashText: {
    fontSize: 14,
  },
  emptyMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyMessageText: {
    fontSize: 16,
    color: 'gray',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
  },
  modalButtonContainer1: {
    alignItems: 'center', // 중앙 정렬
  },
  modalButton: {
    fontSize: 16,
    color: 'black',
  },
});

export default HashtagList;

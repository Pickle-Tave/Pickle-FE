import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

const hashtag = [
  {
    id: 1,
    content: '동물',
  },
  {
    id: 2,
    content: '여행',
  },
  {
    id: 3,
    content: '일상',
  },
  {
    id: 4,
    content: '청춘',
  },
  {
    id: 5,
    content: '행복',
  },
];

const HashtagList = ({visible, onClose}) => {
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
              <View style={styles.hashList}>
                {hashtag.map(item => (
                  <View key={item.id} style={styles.hashItem}>
                    <Text style={styles.hashText}>#{item.content}</Text>
                  </View>
                ))}
              </View>
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
    shadowOffset: {width: 0, height: 2},
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
    width: '95%',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap', // 아이템이 너비를 넘으면 다음 줄로 넘어가도록 설정
    paddingVertical: 15,
    justifyContent: 'center', // 가로축 기준 중앙 정렬
    alignItems: 'center', // 세로축 기준 중앙 정렬
    marginTop: 15,
  },
  hashItem: {
    marginHorizontal: 8, // 해시태그 간 간격 추가
    marginVertical: 4, // 세로 간격 추가
  },
  hashText: {
    fontSize: 14,
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

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHashTags} from '../../src/actions/ImageHashTagAction';
import {HashTagListCheck} from '../../api/HashTagListCheck';

const HashtagList = ({visible, onClose}) => {
  const dispatch = useDispatch();
  const hashtagList = useSelector(state => state.HashTagReducer.hashtagList);

  useEffect(() => {
    if (visible) {
      dispatch(HashTagListCheck());
    }
  }, [dispatch, visible]);

  const renderHashTagItem = item => (
    <View style={styles.hashItem} key={item.id.toString()}>
      <Text style={styles.hashText}>{`#${item.text}`}</Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.hashList}
                showsHorizontalScrollIndicator={false}>
                {hashtagList.map(renderHashTagItem)}
              </ScrollView>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.modalButtonContainer1}>
                  <Text style={styles.modalButton}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Filter4 = () => {
  const navigation = useNavigation();
  const route = useRoute(); // useRoute 훅을 사용하여 경로 정보 가져오기
  const {groupedImages} = route.params; // Filter3에서 전달된 데이터
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [currentGroupImages, setCurrentGroupImages] = useState([]); // 현재 그룹의 모든 이미지 저장
  const hashTags = useSelector(state => state.imageHashTag?.hashTags || {});

  useEffect(() => {
    dispatch(fetchHashTags()); // 해시태그 가져오기
  }, [dispatch]);

  const handleNavigation = () => {
    navigation.navigate('Filter5');
  };

  const handleGroupPress = groupId => {
    setCurrentGroupId(groupId); // 선택한 그룹 ID 저장
    setCurrentGroupImages(groupedImages[groupId]); // 현재 그룹의 모든 이미지 저장
    setModalVisible(true);
  };

  const handleOptionPress = option => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === currentGroupId
          ? {
              ...group,
              selectedOptions: group.selectedOptions.includes(option)
                ? group.selectedOptions.filter(item => item !== option)
                : [...group.selectedOptions, option],
            }
          : group,
      ),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.step_3}
          source={require('../../assets/icon/step_3.png')}
          resizeMode="contain"
        />
        <Text style={styles.text}>그룹을 클릭하고 해시태그를 지정하세요!</Text>
      </View>

      <View style={styles.gridContainer}>
        {groupedImages.map((group, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 && index !== 0 && (
              <View style={styles.separator} />
            )}
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.imageWrapper}
                onPress={() => handleGroupPress(index)}>
                <Image
                  source={{uri: group[0]}} // 첫 번째 이미지를 썸네일로 사용
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
      </View>
      {modalVisible && (
        <HashtagList
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
      <TouchableOpacity onPress={handleNavigation}>
        <Image
          style={styles.next}
          source={require('../../assets/icon/next2.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  step_3: {
    width: 300,
    margin: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%', // 2개씩 배치
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
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
  next: {
    width: 120,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Filter4;

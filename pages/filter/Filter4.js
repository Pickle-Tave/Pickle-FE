import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addHashTag} from '../../src/actions/ImageHashTagAction';
import {assignHashTag} from '../../api/HashTagAssign';

const Filter4 = () => {
  const navigation = useNavigation();
  const route = useRoute(); // useRoute 훅을 사용하여 경로 정보 가져오기
  const {groupedImages} = route.params; // Filter3에서 전달된 데이터(여러 그룹 이미지들)
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [currentGroupImages, setCurrentGroupImages] = useState([]); // 현재 그룹의 모든 이미지 저장
  const [selectedTags, setSelectedTags] = useState([]); // 각 그룹의 선택된 해시태그 저장
  const hashtagList = useSelector(state => state.HashTagReducer.hashtagList); // 해시태그 목록을 가져옴

  const handleNavigation = () => {
    navigation.navigate('Filter5');
  };

  // 이미지 그룹 클릭할 때 호출 -> 현재 그룹 id, 이미지 저장
  const handleGroupPress = groupId => {
    setCurrentGroupId(groupId); // 선택한 그룹 ID 저장
    setCurrentGroupImages(groupedImages[groupId]); // 현재 그룹의 모든 이미지 저장
    setModalVisible(true);
  };

  // 해시태그를 선택할 때 호출 -> 선택한 해시태그 저장 및 API 호출
  const handleSelectTag = async tag => {
    const newSelectedTags = [...selectedTags];
    newSelectedTags[currentGroupId] = tag.text;
    setSelectedTags(newSelectedTags);

    const imageUrls = currentGroupImages.map(url => url.split('?')[0]);
    try {
      const requestBody = {
        imageUrls,
        hashtagId: tag.id,
      };
      const data = await assignHashTag(requestBody);
      console.log('해시태그 저장 성공:', data);
      setModalVisible(false);
    } catch (error) {
      console.error('해시태그 저장 중 오류 발생:', error);
      Alert.alert(
        'Error',
        `해시태그 저장 중 오류가 발생했습니다: ${error.message}`,
      );
    }
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
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <ScrollView contentContainerStyle={styles.hashList}>
                    {hashtagList.map(item => (
                      <TouchableOpacity
                        key={item.id.toString()}
                        style={[
                          styles.hashItem,
                          selectedTags[currentGroupId] === item.text &&
                            styles.selectedHashItem,
                        ]}
                        onPress={() => handleSelectTag(item)}>
                        <Text
                          style={[
                            styles.hashText,
                            selectedTags[currentGroupId] === item.text &&
                              styles.selectedHashText,
                          ]}>
                          {`#${item.text}`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={styles.modalButtonContainer1}>
                      <Text style={styles.modalButton}>닫기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  hashList: {
    flexDirection: 'column',
    paddingVertical: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  hashItem: {
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedHashItem: {
    backgroundColor: '#F7F8CB',
    borderRadius: 8,
  },
  hashText: {
    fontSize: 18,
  },
  selectedHashText: {
    color: 'white',
  },
  next: {
    width: 120,
    marginTop: 20,
  },
  modalButton: {
    fontSize: 16,
    color: 'black',
  },
});

export default Filter4;

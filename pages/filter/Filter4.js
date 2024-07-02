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
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHashTags} from '../../src/actions/ImageHashTagAction';

// 해시태그 연동하면서 오류 해결
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

  const currentGroup = groupedImages[currentGroupId];

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
                onLongPress={() => handleGroupPress(index)}>
                <Image
                  source={{uri: group[0]}} // 첫 번째 이미지를 썸네일로 사용
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
      </View>
      {currentGroup && (
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>그룹의 모든 이미지</Text>
              <View style={styles.imagesWrapper}>
                {currentGroupImages.map((item, index) => (
                  <Image
                    key={index}
                    source={{uri: item}}
                    style={styles.fullImage}
                  />
                ))}
              </View>
              <FlatList
                data={hashTags[currentGroupId] || []} // 현재 그룹의 해시태그 가져오기
                renderItem={({item}) => (
                  <View style={styles.hashTagItem}>
                    <Text style={styles.hashTagText}>#{item}</Text>
                    <TouchableOpacity onPress={() => handleOptionPress(item)}>
                      <Text style={styles.optionText}>추가/제거</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#F7F8CB',
  },
  imagesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  hashTagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  hashTagText: {
    fontSize: 16,
    color: 'black',
  },
  optionText: {
    fontSize: 14,
    color: 'blue',
  },
  next: {
    width: 120,
    marginTop: 20,
  },
  fullImage: {
    width: 100,
    height: 100,
    margin: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    left: 125,
  },
});

export default Filter4;

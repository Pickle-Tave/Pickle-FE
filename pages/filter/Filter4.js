import React, {useState, useEffect, useRef} from 'react';
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
  Animated,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {assignHashTag} from '../../api/HashTagAssign';
import {HashTagListCheck} from '../../api/HashTagListCheck';

const Filter4 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {groupedImages} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [currentGroupImages, setCurrentGroupImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [imageIds, setImageIds] = useState({});
  const hashtagList = useSelector(state => state.HashTagReducer.hashtagList);
  const dispatch = useDispatch();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleNavigation = () => {
    navigation.navigate('Filter5', {
      groupedImages,
      imageIds,
    });
  };

  useEffect(() => {
    dispatch(HashTagListCheck());
  }, [dispatch]);

  const handleGroupPress = groupId => {
    setCurrentGroupId(groupId);
    setCurrentGroupImages(groupedImages[groupId]);
    setModalVisible(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleSelectTag = async tag => {
    const imageUrls = currentGroupImages.map(url => url.split('?')[0]);
    try {
      const requestBody = {
        imageUrls,
        hashtagId: tag.id,
      };
      const data = await assignHashTag(requestBody);
      const imageIdList = data.imageIds; // 반환된 이미지 ID 리스트
      setImageIds(prevState => ({
        ...prevState,
        [currentGroupId]: imageIdList,
      }));
      setSelectedTags(prevState => ({
        ...prevState,
        [currentGroupId]: tag.text,
      }));
    } catch (error) {
      console.error('해시태그 저장 중 오류 발생:', error);
      Alert.alert(
        'Error',
        `해시태그 저장 중 오류가 발생했습니다: ${error.message}`,
      );
    }
  };

  const modalTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.step_3}
            source={require('../../assets/icon/step_3.png')}
            resizeMode="contain"
          />
          <Text style={styles.text}>
            그룹을 클릭하고 해시태그를 지정하세요!
          </Text>
        </View>

        <View style={styles.gridContainer}>
          {groupedImages.map((group, index) => (
            <React.Fragment key={index}>
              {index % 2 === 0 && index !== 0}
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.imageWrapper}
                  onPress={() => handleGroupPress(index)}>
                  <Image source={{uri: group[0]}} style={styles.image} />
                  <Text style={styles.imageCount}>{`${group.length}장`}</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ))}
        </View>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="none"
          onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    styles.modalContainer,
                    {transform: [{translateY: modalTranslateY}]},
                  ]}>
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
                            selectedTags[currentGroupId] === item.text,
                          ]}>
                          {`#${item.text}`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
      <View style={styles.fixedFooter}>
        <TouchableOpacity onPress={handleNavigation}>
          <Image
            style={styles.next}
            source={require('../../assets/icon/next2.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
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
    marginBottom: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
    marginBottom: 20,
    marginHorizontal: '1%', // 좌우 간격 추가
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '55%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#F7F8CB',
    borderWidth: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 15,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  imageCount: {
    position: 'absolute',
    bottom: 5,
    right: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
  },
});

export default Filter4;

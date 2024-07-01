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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHashTags} from '../../src/actions/ImageHashTagAction';

const Filter4 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [currentImageId, setCurrentImageId] = useState(null);
  const hashTags = useSelector(state => state.imageHashTag?.hashTags || {}); // 상태 확인 추가
  const [groups, setGroups] = useState([]); // 그룹 상태 추가

  useEffect(() => {
    // 그룹 데이터 가져오기
    const fetchGroups = async () => {
      // API 호출
      // const response = await fetch('API_URL');
      // const data = await response.json();

      /* 예시 데이터
      const data = [
        {
          id: 1,
          thumbnails: ['', ''],
          selectedOptions: [],
        },
      ];*/

      setGroups(data);
    };

    fetchGroups();
    dispatch(fetchHashTags()); // 해시태그 가져오기
  }, [dispatch]);

  const handleNavigation = () => {
    navigation.navigate('Filter5');
  };

  const handleGroupPress = groupId => {
    setCurrentGroupId(groupId); // 선택한 그룹 ID 저장
    setModalVisible(true);
  };

  // 수정
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

  const currentGroup = groups.find(group => group.id === currentGroupId);

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
        {groups.map((group, index) => (
          <React.Fragment key={group.id}>
            {index % 2 === 0 && index !== 0 && (
              <View style={styles.separator} />
            )}
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.imageWrapper}
                onPress={() => handleGroupPress(group.id)}>
                <Image
                  source={{uri: group.thumbnails[0]}} // 썸네일
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
              <View style={styles.optionContainer}>
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
              </View>
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
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#F7F8CB',
  },
  optionContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  option: {
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F7F8CB',
    backgroundColor: 'white',
  },
  selectedOption: {
    backgroundColor: '#F7F8CB',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  next: {
    width: 120,
    marginTop: 20,
  },
});

export default Filter4;

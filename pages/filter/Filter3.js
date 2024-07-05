import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation, useRoute} from '@react-navigation/native';
import Modal from 'react-native-modal';

const Filter3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {groupedImages = []} = route.params; // Filter1에서 전달된 분류된 이미지 리스트 기본값 설정

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleNavigation = () => {
    // 선택된 이미지 그룹만 필터링하여 넘기기
    const selectedGroups = groupedImages.filter((group, groupIndex) =>
      group.some((_, imgIndex) =>
        selected.includes(`${groupIndex}-${imgIndex}`),
      ),
    );
    console.log('Selected Groups:', selectedGroups); // 필터링된 그룹 확인
    navigation.navigate('Filter4', {groupedImages: selectedGroups});
  };

  // 개별 이미지 선택 및 해제
  const handleSelect = (groupIndex, imgIndex) => {
    const id = `${groupIndex}-${imgIndex}`;
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
    console.log('Selected Images:', selected); // 선택된 이미지 확인
  };

  // 전체 이미지 선택 및 해제
  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      const allImageIds = groupedImages.flatMap((group, groupIndex) =>
        group.map((_, imgIndex) => `${groupIndex}-${imgIndex}`),
      );
      setSelected(allImageIds);
    }
    setSelectAll(!selectAll);
  };

  const handleImagePress = image => {
    setCurrentImage(image);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.step_3}
        source={require('../../assets/icon/step_3.png')}
        resizeMode="contain"
      />
      <Text style={styles.text}>마음에 드는 사진을 선택하세요!</Text>
      <View style={styles.selectAllContainer}>
        <CheckBox
          value={selectAll}
          onValueChange={handleSelectAll}
          tintColors={{true: '#017AFF', false: '#000000'}}
        />
        <Text style={styles.selectAllText}>전체선택</Text>
      </View>
      <View style={styles.gridContainer}>
        {groupedImages.map((group, groupIndex) =>
          group.map((image, imgIndex) => (
            <React.Fragment key={`${groupIndex}-${imgIndex}`}>
              {imgIndex % 2 === 0 && imgIndex !== 0 && (
                <View style={styles.separator} />
              )}
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.imageWrapper}
                  onPress={() => handleImagePress(image)}>
                  <Image source={{uri: image}} style={styles.image} />
                  <CheckBox
                    value={selected.includes(`${groupIndex}-${imgIndex}`)}
                    onValueChange={() => handleSelect(groupIndex, imgIndex)}
                    style={styles.checkbox}
                    tintColors={{true: '#017AFF', false: '#000000'}}
                  />
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )),
        )}
      </View>
      {currentImage && (
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Image
              source={{uri: currentImage}}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
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
  step_3: {
    width: 300,
    margin: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    left: 10,
    width: 150,
    height: 190,
    borderRadius: 10,
  },
  checkbox: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 120,
    margin: 8,
  },
  selectAllText: {
    fontSize: 15,
    color: 'black',
    top: -2,
  },
  next: {
    width: 120,
    top: -10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#769370',
    borderRadius: 45,
    padding: 5,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default Filter3;

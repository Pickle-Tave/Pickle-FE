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
    const selectedGroups = groupedImages
      .map((group, groupIndex) =>
        group.filter((_, imgIndex) =>
          selected.includes(`${groupIndex}-${imgIndex}`),
        ),
      )
      .filter(group => group.length > 0); // 빈 그룹 제거
    // console.log('Selected Groups:', selectedGroups); // 필터링된 그룹 확인
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
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.step_2}
          source={require('../../assets/icon/step_2.png')}
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
                style={{alignItems: 'flex-end', marginRight: 20}}
                onPress={() => setModalVisible(false)}>
                <Image
                  style={{width: 15, height: 15, marginTop: 9}}
                  source={require('../../assets/icon/cancel2.png')}
                />
              </TouchableOpacity>
              <Image
                source={{uri: currentImage}}
                style={styles.fullImage}
                resizeMode="contain"
              />
            </View>
          </Modal>
        )}
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
  step_2: {
    width: 300,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    margin: 14,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
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
    marginBottom: 20,
    left: 120,
  },
  selectAllText: {
    fontSize: 15,
    color: 'black',
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '60%',
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
  },
  fullImage: {
    width: '100%',
    height: '85%',
    resizeMode: 'contain',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default Filter3;

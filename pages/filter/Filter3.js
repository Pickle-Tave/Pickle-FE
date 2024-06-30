import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

const Filter3 = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    // API 호출하여 이미지 데이터 받아오기
    const fetchImages = async () => {
      try {
        const response = await fetch(''); // 수정
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  const handleNavigation = () => {
    navigation.navigate('Filter4');
  };

  const handleSelect = id => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(images.map(image => image.id));
    }
    setSelectAll(!selectAll);
  };

  const handleImagePress = image => {
    setCurrentImage(image.imageUrl);
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
        {images.map((image, index) => (
          <React.Fragment key={image.id}>
            {index % 2 === 0 && index !== 0 && (
              <View style={styles.separator} />
            )}
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.imageWrapper}
                onPress={() => handleImagePress(image)}>
                <Image source={{uri: image.imageUrl}} style={styles.image} />
                <CheckBox
                  value={selected.includes(image.id)}
                  onValueChange={() => handleSelect(image.id)}
                  style={styles.checkbox}
                  tintColors={{true: '#017AFF', false: '#000000'}}
                />
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
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

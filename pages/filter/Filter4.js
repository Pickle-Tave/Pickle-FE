import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Filter4 = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleNavigation = () => {
    navigation.navigate('Filter5');
  };

  const images = [
    {id: 1, src: require('../../assets/icon/photo1.png')},
    {id: 2, src: require('../../assets/icon/photo2.png')},
    {id: 3, src: require('../../assets/icon/photo3.png')},
    {id: 4, src: require('../../assets/icon/photo4.png')},
    {id: 5, src: require('../../assets/icon/photo5.png')},
  ];

  const handleImagePress = image => {
    setCurrentImage(image);
    setModalVisible(true);
  };

  const handleOptionPress = option => {
    setSelectedOptions(prevState =>
      prevState.includes(option)
        ? prevState.filter(item => item !== option)
        : [...prevState, option],
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
        {images.map((image, index) => (
          <React.Fragment key={image.id}>
            {index % 2 === 0 && index !== 0 && (
              <View style={styles.separator} />
            )}
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.imageWrapper}
                onPress={() => handleImagePress(image.src)}>
                <Image source={image.src} style={styles.image} />
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
      </View>
      {currentImage && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          animationType="fade">
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <View style={styles.optionContainer}>
                {['동물', '여행', '힐링', '임시'].map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.option,
                      selectedOptions.includes(option) && styles.selectedOption,
                    ]}
                    onPress={() => handleOptionPress(option)}>
                    <Text style={styles.optionText}>#{option}</Text>
                  </TouchableOpacity>
                ))}
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
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
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
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    backgroundColor: '#f0f0f0', // 옵션 배경 색상
  },
  selectedOption: {
    backgroundColor: '#d3d3d3',
  },
  optionText: {
    fontSize: 18,
  },
  next: {
    width: 120,
    marginTop: 20,
  },
});

export default Filter4;

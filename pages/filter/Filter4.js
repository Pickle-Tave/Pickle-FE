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
  const [images, setImages] = useState([
    {id: 1, src: require('../../assets/icon/photo1.png'), selectedOptions: []},
    {id: 2, src: require('../../assets/icon/photo2.png'), selectedOptions: []},
    {id: 3, src: require('../../assets/icon/photo3.png'), selectedOptions: []},
    {id: 4, src: require('../../assets/icon/photo4.png'), selectedOptions: []},
    {id: 5, src: require('../../assets/icon/photo5.png'), selectedOptions: []},
  ]);

  const [currentImageId, setCurrentImageId] = useState(null);

  const handleNavigation = () => {
    navigation.navigate('Filter5');
  };

  const handleImagePress = imageId => {
    setCurrentImageId(imageId);
    setModalVisible(true);
  };

  const handleOptionPress = option => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === currentImageId
          ? {
              ...img,
              selectedOptions: img.selectedOptions.includes(option)
                ? img.selectedOptions.filter(item => item !== option)
                : [...img.selectedOptions, option],
            }
          : img,
      ),
    );
  };

  const currentImage = images.find(img => img.id === currentImageId);

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
                onPress={() => handleImagePress(image.id)}>
                <Image source={image.src} style={styles.image} />
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
      </View>
      {currentImage && (
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.optionContainer}>
                {['동물', '여행', '일상', '청춘', '행복'].map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.option,
                      currentImage.selectedOptions.includes(option) &&
                        styles.selectedOption,
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

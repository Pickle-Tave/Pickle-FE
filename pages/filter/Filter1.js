import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {classifyImages} from '../../api/ImageClassify';
import {SkypeIndicator} from 'react-native-indicators';

const Filter1 = ({route}) => {
  const navigation = useNavigation();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [strongClustering, setStrongClustering] = useState(true);
  const [loading, setLoading] = useState(false);
  const {imageUrls} = route.params; // 이전 화면에서 전달된 이미지 URL 리스트

  const handlePress1 = () => {
    setChecked1(!checked1);
  };

  const handlePress2 = () => {
    setChecked2(!checked2);
  };

  const handleStrongPress = () => {
    setStrongClustering(true);
  };

  const handleWeakPress = () => {
    setStrongClustering(false);
  };

  const handleNavigation = async () => {
    setLoading(true); // 로딩 상태 시작
    try {
      const requestBody = {
        imageUrls: imageUrls.map(url => url.split('?')[0]), // Presigned URL에서 파라미터 제거
        strongClustering,
        eyeClosing: checked2,
        blurred: checked1,
      };
      console.log('Request Body:', requestBody);

      // API 호출
      const data = await classifyImages(requestBody);

      console.log('Grouped Images:', data.groupedImages);

      // 다음 화면으로 이동하면서 분류 결과 전달
      navigation.navigate('Filter3', {groupedImages: data.groupedImages});
    } catch (error) {
      Alert.alert(
        'Error',
        `이미지 분류 중 오류가 발생했습니다: ${error.message}`,
      );
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <SkypeIndicator color="#606E76" size={145} style={styles.indicator} />
        </View>
      )}
      {!loading && (
        <>
          <Image
            style={styles.step_1}
            source={require('../../assets/icon/step_1.png')}
            resizeMode="contain"
          />
          <Image
            style={styles.option1}
            source={require('../../assets/icon/option1.png')}
            resizeMode="contain"
          />
          <View style={styles.strengthContainer}>
            <TouchableOpacity onPress={handleStrongPress}>
              <Image
                style={styles.strong}
                source={require('../../assets/icon/strong.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleWeakPress}>
              <Image
                style={styles.weak}
                source={require('../../assets/icon/weak.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <Image
            style={styles.option2}
            source={require('../../assets/icon/option2.png')}
            resizeMode="contain"
          />
          <View style={styles.checkboxes}>
            <TouchableOpacity
              style={[styles.textButton, checked1 && styles.checkedBackground]}
              onPress={handlePress1}>
              <Text style={[styles.label, checked1 && styles.checkedLabel]}>
                선명하지 않은 사진 제외
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.textButton, checked2 && styles.checkedBackground]}
              onPress={handlePress2}>
              <Text style={[styles.label, checked2 && styles.checkedLabel]}>
                눈 감은 사진 제외
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigation}>
              <Image
                style={styles.next}
                source={require('../../assets/icon/next2.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  step_1: {
    width: 300,
  },
  option1: {
    width: 200,
  },
  strengthContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: -20,
  },
  weak: {
    width: 130,
    marginVertical: -50,
    top: -15,
  },
  strong: {
    width: 130,
    marginVertical: 10,
  },
  option2: {
    width: 180,
    top: -10,
    left: -3,
  },
  separator: {
    width: '80%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 30,
  },
  checkboxes: {
    marginTop: 10,
    width: '55%',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#769370',
    borderRadius: 8,
    marginRight: 8,
    margin: 5,
  },
  checkedBackground: {
    backgroundColor: '#B9CCA0',
    borderRadius: 13,
  },
  checkedLabel: {
    color: 'white',
    width: 190,
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
  },
  next: {
    width: 120,
    top: 15,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 60,
  },
});

export default Filter1;

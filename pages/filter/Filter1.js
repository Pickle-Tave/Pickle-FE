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
import instance from '../../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Filter1 = ({route}) => {
  const navigation = useNavigation();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const {imageUrls} = route.params; // 이전 화면에서 전달된 이미지 URL 리스트

  const handlePress1 = () => {
    setChecked1(!checked1);
  };

  const handlePress2 = () => {
    setChecked2(!checked2);
  };

  const handleNavigation = async () => {
    try {
      // AsyncStorage에서 accessToken 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      // API 요청 본문 생성
      const requestBody = {
        imageUrls: imageUrls.map(url => url.split('?')[0]), // Presigned URL에서 파라미터 제거
        strongClustering: true, // 강하게 클러스터링 (예시)
        eyeClosing: checked2, // 눈 감은 사진 제외
        blurred: checked1, // 선명하지 않은 사진 제외
      };

      // API 호출
      const response = await instance.post('/images/classify', requestBody, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });

      if (response.status === 200) {
        // 성공적인 응답 처리
        const {groupedImages} = response.data.data;
        console.log('Grouped Images:', groupedImages);
        // 다음 화면으로 이동하면서 분류 결과 전달
        navigation.navigate('Filter2', {groupedImages});
      } else {
        throw new Error(`Failed to classify images: ${response.status}`);
      }
    } catch (error) {
      console.error('Error classifying images:', error);
      Alert.alert(
        'Error',
        `이미지 분류 중 오류가 발생했습니다: ${error.message}`,
      );
    }
  };

  return (
    <View style={styles.container}>
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
        <TouchableOpacity>
          <Image
            style={styles.strong}
            source={require('../../assets/icon/strong.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  step_1: {
    width: 300,
    margin: 10,
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
    width: 184,
    top: -10,
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
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
  },
  next: {
    width: 120,
    marginTop: 30,
    left: 55,
  },
});

export default Filter1;

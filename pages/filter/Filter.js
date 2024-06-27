import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import instance from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Filter = () => {
  const navigation = useNavigation();

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: false,
        quality: 1,
        selectionLimit: 0,
      },
      async res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else {
          const asset = res.assets[0];
          await uploadImageToS3(asset); // s3에 업로드
          navigation.navigate('Filter1', {images: res.assets});
        }
      },
    );
  };

  const uploadImageToS3 = async asset => {
    try {
      // AsyncStorage에서 accessToken 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      // Presigned URL 요청
      const response = await instance.post(
        '/album/upload-url',
        {albumId: 1},
        {headers: {Authorization: `Bearer ${accessToken}`}},
      );

      if (response.status !== 200) {
        throw new Error(`Failed to get presigned URL: ${response.status}`);
      }

      const presignedUrl = response.data.data.presignedUrl;
      console.log('Presigned URL:', presignedUrl);

      // 이미지를 Blob으로 변환하여 PUT 요청으로 업로드
      const fetchResponse = await fetch(asset.uri);
      const blob = await fetchResponse.blob();

      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: blob,
      });
      if (uploadResponse.ok) {
        Alert.alert('Success', '이미지 업로드가 성공적으로 완료되었습니다!');
      } else {
        console.error('Failed to upload image:', uploadResponse);
        Alert.alert('Error', '이미지 업로드에 실패했습니다');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert(
        'Error',
        `이미지 업로드 중 오류가 발생했습니다: ${error.message}`,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.step_0}
        source={require('../../assets/icon/step_0.png')}
        resizeMode="contain"
      />
      <Text style={styles.text}>사진을 선택하세요!</Text>
      <Image
        style={styles.tip}
        source={require('../../assets/icon/tip.png')}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={onSelectImage}>
        <Image
          style={styles.gallery}
          source={require('../../assets/icon/go_gallery.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.text_tip}>나만의 추억이 담긴 사진을 정리해요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  step_0: {
    width: 300,
    margin: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tip: {
    width: 40,
    height: 40,
    left: -120,
    top: 430,
  },
  gallery: {
    width: 370,
    height: 370,
    top: -15,
  },
  text_tip: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 28,
    left: 20,
  },
});

export default Filter;

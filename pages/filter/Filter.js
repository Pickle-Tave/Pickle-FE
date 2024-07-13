import React, {useState} from 'react';
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
import {getPresignedUrls} from '../../api/ImageUpload';
import {SkypeIndicator} from 'react-native-indicators';

const Filter = () => {
  const navigation = useNavigation();

  // 업로드 상태를 나타내기 위한 변수
  const [isUploading, setIsUploading] = useState(false);

  // 이미지를 선택하는 함수
  const onSelectImage = () => {
     // 업로드 상태를 true로 설정
     setIsUploading(true);
     
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: false,
        quality: 1,
        selectionLimit: 0, // 0으로 설정하면 여러 개의 이미지 선택 가능
      },
      async res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else {
          const assets = res.assets; // 선택한 모든 이미지들
          console.log('Selected assets:', assets);

         

          // 필요한 Presigned URL 개수만큼 요청
          const presignedUrls = await getPresignedUrls(assets.length);

          // 각 이미지에 대해 Presigned URL을 사용하여 업로드
          const imageUrls = await Promise.all(
            assets.map((asset, index) =>
              uploadImageToS3(asset, presignedUrls[index]),
            ),
          );

          console.log('Uploaded image URLs:', imageUrls);
          navigation.navigate('Filter1', {imageUrls});
          setIsUploading(false);
        }
      },
    );
  };

  // 이미지를 S3에 업로드하는 함수
  const uploadImageToS3 = async (asset, presignedUrl) => {
    try {
      console.log('Uploading image to S3 with URL:', presignedUrl);

      // 이미지를 Blob으로 변환하여 PUT 요청으로 업로드
      const fetchResponse = await fetch(asset.uri);
      const blob = await fetchResponse.blob();

      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: blob,
      });

      if (uploadResponse.ok) {
        console.log('Image uploaded successfully!');
        //Alert.alert('Success', '이미지 업로드에 성공했습니다!');
        return presignedUrl.split('?')[0]; // 업로드된 이미지 URL 반환
      } else {
        const responseText = await uploadResponse.text();
        console.error('Failed to upload image:', uploadResponse, responseText);
        Alert.alert('Error', '이미지 업로드에 실패했습니다');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert(
        'Error',
        `이미지 업로드 중 오류가 발생했습니다: ${error.message}`,
      );
      return null;
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
      {isUploading && (
        <View style={styles.loadingContainer}>
          <SkypeIndicator color="#606E76" size={145} />
        </View>
      )}
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
    margin: 20,
  },
  text: {
    fontSize: 18,
    color: 'black',
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
    fontSize: 15.5,
    color: 'black',
    textAlign: 'center',
    top: 28,
    left: 20,
  },
  loadingContainer: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Filter;

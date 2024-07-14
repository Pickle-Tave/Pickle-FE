import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ImgDeleteModal from './Modal/ImgDeleteModal';
import ImgEnlargeModal from './Modal/ImgEnlargeModal';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {getPresignedUrls} from '../api/ImageUpload';
import {ImageAddAlbum} from '../api/ImageAddAlbum';
import {GetAlbumInquiry} from '../api/GetAlbumInquiry';
import {ImageDelete} from '../api/ImageDelete';
import {InitializeAlbumImages} from '../src/actions/AlbumImageAction';

const AlbumAccess = ({check, setCheck, searchedAlbumName, albumId}) => {
  const dispatch = useDispatch();
  // 현재 조회된 앨범의 이미지 리스트
  const currentImageList = useSelector(state => state.AlbumImageReducer);

  // 모달 visible 상태
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [imgEnlargeVisible, setImgEnlargeVisible] = useState(false);

  // 현재 체크박스로 체크된 이미지 배열
  const [selectedImages, setSelectedImages] = useState([]);

  // 현재 선택된 이미지 정보 저장(이미지를 크게 보기 위해서)
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);

  // 로딩 상태를 나타내기 위한 변수
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  // 업로드 상태를 나타내기 위한 변수
  const [isUploading, setIsUploading] = useState(false);

  // 갤러리 이미지 선택
  const onSelectImage = () => {
    // 업로드 상태를 true로 설정
    setIsUploading(true);

    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android' || Platform.OS === 'ios',
        quality: 1,
        selectionLimit: 0,
      },
      async res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else {
          const assets = res.assets; // 선택한 모든 이미지들
          console.log('selected assets', assets);

          // 필요한 Presigned URL 개수만큼 요청
          const presignedUrls = await getPresignedUrls(assets.length);
          console.log('presigned배열', presignedUrls);

          // 각 이미지에 대해 Presigned URL을 사용하여 업로드
          const imageUrls = await Promise.all(
            assets.map((asset, index) =>
              uploadImageToS3(asset, presignedUrls[index]),
            ),
          );

          // 앨범에 이미지 추가하기
          ImageAddAlbum(albumId, imageUrls).then(() => {
            dispatch(InitializeAlbumImages());
            setIsReloading(true);
            dispatch(GetAlbumInquiry(null, 50, albumId)).then(() => {
              setIsReloading(false);
              // 업로드 상태를 false로 설정
              setIsUploading(false);
            });
          });
          console.log('이미지추가 앨범 id', albumId);

          console.log('Uploaded image URLs:', imageUrls);
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
        // Alert.alert('Success', '이미지 업로드에 성공했습니다!');
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

  // 선택된 이미지 삭제하기
  const handleDeleteImages = () => {
    ImageDelete(selectedImages).then(() => {
      // 삭제하고 나서 사진 목록 다시 처음부터 조회하기
      dispatch(InitializeAlbumImages());
      setIsReloading(true);
      console.log('삭제하고나서 새로운 이미지 리스트 요청 보내는중');
      dispatch(GetAlbumInquiry(null, 50, albumId)).then(() => {
        setIsReloading(false);
      });
    });
    setSelectedImages([]);
    setCheck(false);
    setDeleteVisible(false);
  };

  // 이미지 무한스크롤 구현
  const fetchMoreImages = () => {
    if (isLoadingMore) {
      return; // 이미 로딩 중인 경우 추가 요청 방지
    }

    if (currentImageList.last) {
      return; // 이미 마지막 페이지에 도달한 경우 추가 요청 방지
    }

    setIsLoadingMore(true); // 로딩 시작

    if (!isReloading) {
      console.log('사진 추가 요청 들어가는중...');
      dispatch(GetAlbumInquiry(currentImageList.lastImageId, 50, albumId))
        .then(() => setIsLoadingMore(false)) // 로딩 완료
        .catch(error => {
          setIsLoadingMore(false); // 에러 발생 시 로딩 해제
          console.log('사진 목록 추가 요청 에러:', error);
        });
    }
  };

  const handleCancel = () => {
    setCheck(false);
    setSelectedImages([]);
  };

  const handleCheck = () => {
    setCheck(true);
  };

  // 선택된 이미지 갯수
  const selectedImageNum = selectedImages.length;

  // 전체선택 기능
  const handleSelectAll = isChecked => {
    if (isChecked) {
      const allImageIds = currentImageList.imageList.map(item => item.imageId);
      setSelectedImages(allImageIds);
    } else {
      setSelectedImages([]);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.picture_container}>
      <Text style={styles.hash_text}>
        {item.tagName ? `#${item.tagName}` : '#해시태그'}
      </Text>
      {check && (
        <BouncyCheckbox
          style={styles.checkbox}
          size={17}
          fillColor="blue"
          unFillColor="transparent"
          iconStyle={{borderColor: 'black', borderRadius: 0}} // 체크되지 않았을 때
          innerIconStyle={{borderColor: 'black', borderRadius: 0}} // 체크되었을 때
          isChecked={selectedImages.includes(item.imageId)}
          onPress={isChecked => {
            if (isChecked) {
              setSelectedImages([...selectedImages, item.imageId]);
            } else {
              setSelectedImages(
                selectedImages.filter(id => id !== item.imageId),
              );
            }
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          setSelectedImageSrc(item.imageUrl);
          setImgEnlargeVisible(true);
        }}>
        <Image style={styles.picture} source={{uri: item.imageUrl}} />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImgDeleteModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        onDelete={handleDeleteImages}
        selectedImageNum={selectedImageNum}
      />
      <ImgEnlargeModal
        visible={imgEnlargeVisible}
        onClose={() => setImgEnlargeVisible(false)}
        imageSrc={selectedImageSrc}
      />
      <View style={styles.upper_section}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{searchedAlbumName}</Text>
          <TouchableOpacity onPress={check ? handleCancel : handleCheck}>
            {check ? (
              <Text style={styles.check_btn}>취소</Text>
            ) : (
              <Text style={styles.check_btn}>선택</Text>
            )}
          </TouchableOpacity>
        </View>
        {check && (
          <View style={styles.selectAllContainer}>
            <BouncyCheckbox
              size={17}
              fillColor="blue"
              unFillColor="transparent"
              text="전체선택"
              textStyle={styles.selectAllText}
              iconStyle={{borderColor: 'black', borderRadius: 0}}
              innerIconStyle={{borderColor: 'black', borderRadius: 0}}
              onPress={handleSelectAll}
            />
          </View>
        )}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={currentImageList.imageList}
          renderItem={renderItem}
          keyExtractor={item => item.imageId.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.image_list}
          onEndReached={fetchMoreImages}
          onEndReachedThreshold={0.1}
        />
        {isUploading && (
          <View style={styles.uploadingContainer}>
            <ActivityIndicator size="large" color="#black" />
            <Text style={styles.uploadingText}>이미지 업로드 중입니다...</Text>
          </View>
        )}
        <View style={styles.iconContainer}>
          {check && (
            <TouchableOpacity
              style={styles.iconButtonLeft}
              onPress={() => setDeleteVisible(true)}>
              <Image
                style={styles.iconImage}
                source={require('../assets/icon/bin.png')}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.iconButtonRight}
            onPress={onSelectImage}>
            <Image
              style={styles.iconImage1}
              source={require('../assets/icon/pic_plus.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  listContainer: {
    flex: 1,
    position: 'relative',
  },
  checkbox: {
    position: 'absolute',
    top: 27,
    left: 6,
    zIndex: 1,
  },
  upper_section: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  check_btn: {
    fontSize: 15,
    backgroundColor: '#769370',
    borderRadius: 20,
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 280,
  },
  selectAllText: {
    fontSize: 15,
    color: 'black',
    textDecorationLine: 'none',
  },
  image_list: {
    paddingLeft: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  picture_container: {
    flex: 1,
    position: 'relative',
  },
  hash_text: {
    fontSize: 15,
    color: 'black',
    marginLeft: 5,
    marginBottom: 3,
  },
  picture: {
    width: 193,
    height: 163,
    borderRadius: 3,
    marginBottom: 7,
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    right: 15,
    zIndex: 1,
  },
  iconButtonLeft: {
    marginRight: 'auto',
  },
  iconButtonRight: {
    marginLeft: 297,
  },
  iconImage: {
    width: 41,
    height: 41,
  },
  iconImage1: {
    width: 41,
    height: 41,
  },
  uploadingContainer: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: 2,
  },
  uploadingText: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
});

export default AlbumAccess;

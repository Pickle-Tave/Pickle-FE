import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ImgDeleteModal from './Modal/ImgDeleteModal';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { addAlbumImage, deleteAlbumImage } from '../src/actions/AlbumImageAction';
import { selectAlbumImagesByAlbumId } from '../src/selectors/selectors';
import { getPresignedUrls } from '../api/ImageUpload';
import ImgEnlargeModal from './Modal/ImgEnlargeModal';
import { ImageAddAlbum } from '../api/ImageAddAlbum';
import { GetAlbumInquiry } from '../api/GetAlbumInquiry';
import { ImageDelete } from '../api/ImageDelete';

const AlbumAccess = ({ check, setCheck, searchedAlbumName, albumId }) => {
    const dispatch = useDispatch();

    //현재 이미지 리스트
    const currentImageList = useSelector((state) => state.AlbumImageReducer)
    console.log("현재 이미지 리스트", currentImageList);

    // 모달 visible 상태
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [imgEnlargeVisible, setImgEnlargeVisible] = useState(false);

    // 현재 체크박스로 체크된 이미지 배열
    const [selectedImages, setSelectedImages] = useState([]);

    // 현재 선택된 이미지 정보 저장(이미지를 크게 보기 위해서)
    const [selectedImageSrc, setSelectedImageSrc] = useState(null);


    // 갤러리에서 선택된 이미지 리스트
    const [selectedImageList, setSelectedImageList] = useState([]);

    // 로딩 상태를 나타내기 위한 변수
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const getNextImageId = (images) => {
        const maxId = images.reduce((max, image) => Math.max(max, image.image_id), 12);
        return maxId + 1;
    };

    //갤러리 이미지 선택
    const onSelectImage = () => {
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
                    const assets = res.assets; //선택한 모든 이미지들 
                    console.log("selected assets", assets);

                    //필요한 Presigned URL 개수만큼 요청
                    const presignedUrls = await getPresignedUrls(assets.length);
                    console.log('presigned배열', presignedUrls);

                    // 각 이미지에 대해 Presigned URL을 사용하여 업로드
                    const imageUrls = await Promise.all(
                        assets.map((asset, index) =>
                            uploadImageToS3(asset, presignedUrls[index]),
                        ),
                    );

                    //앨범에 이미지 추가하기
                    ImageAddAlbum(albumId, imageUrls);
                    console.log("이미지추가 앨범 id", albumId)

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

    //선택된 이미지 삭제하기
    const handleDeleteImages = () => {
        ImageDelete(selectedImages);

        setSelectedImages([]);
        setCheck(false);
        setDeleteVisible(false);

        //삭제하고나서 사진 목록 다시 처음부터 조회하기

    };


    const fetchMorImages = () => {
        if (isLoadingMore) {
            return; //이미 로딩 중인 경우 추가 요청 방지
        }

        if (currentImageList.last) {
            return; //이미 마지막 페이지에 도달한 경우 추가 요청 방지
        }

        setIsLoadingMore(true); //로딩 시작

        dispatch(GetAlbumInquiry(currentImageList.lastImageId, 50, albumId))
            .then(() => setIsLoadingMore(false)) //로딩완료
            .catch((error) => {
                setIsLoadingMore(false); //에러 발생시 로딩 해제
                console.log("사진 목록 추가 요청 에러:", error);
            })

    }

    const handleCancel = () => {
        setCheck(false)
        setSelectedImages([]);
    }

    const handleCheck = () => {
        setCheck(true);
    }

    const selectedImageNum = selectedImages.length;

    const renderItem = ({ item }) => (
        <View style={styles.picture_container}>
            <Text style={styles.hash_text}>{item.tagName}</Text>
            {check &&
                <BouncyCheckbox
                    style={styles.checkbox}
                    size={17}
                    fillColor='black'
                    unFillColor='transparent'
                    iconStyle={{ borderColor: 'black' }}
                    onPress={(isChecked) => {
                        if (isChecked) {
                            setSelectedImages([...selectedImages, item.imageId]);
                        } else {
                            setSelectedImages(selectedImages.filter(id => id !== item.imageId));
                        }
                    }}
                />
            }
            <TouchableOpacity onPress={() => {
                setSelectedImageSrc(item.imageUrl);
                setImgEnlargeVisible(true);
            }}>
                <Image style={styles.picture} source={{ uri: item.imageUrl }} />
            </TouchableOpacity>
        </View>
    );
    
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ImgDeleteModal visible={deleteVisible} onClose={() => setDeleteVisible(false)} onDelete={handleDeleteImages} selectedImageNum={selectedImageNum} />
            <ImgEnlargeModal
                visible={imgEnlargeVisible}
                onClose={() => setImgEnlargeVisible(false)}
                imageSrc={selectedImageSrc} />
            <View style={styles.upper_section}>
                <Text style={styles.title}>{searchedAlbumName}</Text>
                <TouchableOpacity onPress={
                    check ?  handleCancel : handleCheck 
                }>
                    {check ?
                        <Text style={styles.check_btn}>취소</Text>
                        :
                        <Text style={styles.check_btn}>선택</Text>}
                </TouchableOpacity>
            </View>
            <FlatList
                data={currentImageList.imageList}
                renderItem={renderItem}
                keyExtractor={item => item.imageId.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.image_list}
                onEndReached={fetchMorImages} // 끝에 도달하면 추가 데이터 요청
                onEndReachedThreshold={0.1} // 끝에서 얼마나 멀리 있을 때 호출할 지 비율로 설정
                ListFooterComponent={() => ( // 로딩 중임을 나타내는 컴포넌트
                    isLoadingMore && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="gray" />
                        </View>
                    )
                )}

            />
            <View style={check ? styles.lower_section1 : styles.lower_section2}>
                {check &&
                    <TouchableOpacity onPress={() => setDeleteVisible(true)}>
                        <Image style={{ width: 36, height: 36 }} source={require('../assets/icon/bin.png')} />
                    </TouchableOpacity>
                }
                {/* {selectedImageList.length > 0 && (
                    <TouchableOpacity onPress={handleAddSelectedImages}>
                        <Text style={styles.add_btn}>추가 {selectedImageList.length}개</Text>
                    </TouchableOpacity>
                )} */}
                <TouchableOpacity style={styles.pic_plus} onPress={onSelectImage}>
                    <Image style={{ width: 41, height: 41 }} source={require('../assets/icon/pic_plus.png')} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    checkbox: {
        position: 'absolute',
        top: 35,
        left: 10,
        zIndex: 1,
    },
    upper_section: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 8,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    check_btn: {
        fontSize: 15,
        backgroundColor: '#769370',
        borderRadius: 20,
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 4,
    },
    image_list: {
        paddingLeft: 10,
        paddingTop: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    lower_section1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 5,
    },
    lower_section2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 20,
        marginTop: 5,
    },
    picture_container: {
        flex: 1,
        position: 'relative',  // 자식 요소의 절대 위치 설정을 위해 필요
    },
    hash_text: {
        fontSize: 14,
        color: 'black',
        marginLeft: 5,
        marginBottom: 2,
    },
    picture: {
        width: 190,
        height: 155,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 8
    },
    pic_plus: {
        marginBottom: 25,
    }
});

export default AlbumAccess;

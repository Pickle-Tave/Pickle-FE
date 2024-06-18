import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ImgDeleteModal from './Modal/ImgDeleteModal';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { addAlbumImage, deleteAlbumImage } from '../src/actions/AlbumImageAction';
import { selectAlbumImagesByAlbumId } from '../src/selectors/selectors';


// check가 true일때는 취소버튼,체크박스, 휴지통 생성하기

const AlbumAccess = ({ check, setCheck, album_name, album_id }) => {
    const dispatch = useDispatch();

    const selectAlbumImages = selectAlbumImagesByAlbumId(album_id);
    const imageList = useSelector(state => selectAlbumImages(state));

    const [deletevisible, setDeleteVisible] = useState(false);

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
            res => {
                if (res.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res.errorCode) {
                    console.log('ImagePicker Error: ', res.errorMessage);
                } else {
                    console.log('Selected images: ', res.assets);
                    // 선택된 이미지들에 대한 추가 처리 로직
                    res.assets.forEach(asset => {
                        console.log('Image URI: ', asset.uri);
                        // 이미지 표시, 업로드
                    });
                }
            },
        );
    };


    const renderItem = ({ item }) => (
        <View style={styles.picture_container}>
            <Text style={styles.hash_text}>#해시태그</Text>
            {check &&
                <BouncyCheckbox
                    style={styles.checkbox}
                    size={17}
                    fillColor='black'
                    unFillColor='transparent'
                    iconStyle={{ borderColor: 'black' }}
                // onPress
                />
            }
            <Image style={styles.picture} source={item.src} />
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ImgDeleteModal visible={deletevisible} onClose={() => setDeleteVisible(false)} />
            <View style={styles.upper_section}>
                <Text style={styles.title}>{album_name}</Text>
                <TouchableOpacity onPress={() => {
                    check ? setCheck(false) : setCheck(true)
                }}>
                    {check ?
                        <Text style={styles.check_btn}>취소</Text>
                        :
                        <Text style={styles.check_btn}>선택</Text>}
                </TouchableOpacity>
            </View>
            <FlatList
                data={imageList}
                renderItem={renderItem}
                keyExtractor={item => item.image_id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.image_list}
            />
            <View style={check ? styles.lower_section1 : styles.lower_section2}>
                {check &&
                    <TouchableOpacity onPress={() => setDeleteVisible(true)}>
                        <Image style={{ width: 36, height: 36 }} source={require('../assets/icon/bin.png')} />
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.pic_plus} onPress={onSelectImage}>
                    <Image style={{ width: 41, height: 41}} source={require('../assets/icon/pic_plus.png')} />
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
        marginTop: 20,
    },
    lower_section2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 20,
        marginTop: 20,
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
        width: '95%',
        height: 155,
        resizeMode: 'contain',
        borderRadius: 20,
        marginBottom: 8
    },
    pic_plus: {
        marginBottom: 25,
    }
});

export default AlbumAccess;

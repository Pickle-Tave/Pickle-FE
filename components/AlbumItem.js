import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LikeApply } from '../api/LikeApply';
import { LikeUnApply } from '../api/LikeUnApply';
import { InitializeAlbumList } from '../src/actions/AlbumListAction';
import { GetAlbumList } from '../api/GetAlbumList';
import { InitializeLikeList } from '../src/actions/AlbumLikeAction';
import { SearchAlbumLike } from '../api/SearchAlbumLike';

const AlbumItem = (props) => {
    const dispatch = useDispatch();

    // 즐겨찾기 설정
    const handleLikeApply = async () => {
        try {
            await LikeApply(props.albumId);
            dispatch(InitializeAlbumList());
            dispatch(GetAlbumList(null, 10)); // 앨범 목록 갱신
            dispatch(InitializeLikeList());
            dispatch(SearchAlbumLike(null, 10));
        } catch (error) {
            console.error('좋아요 설정 에러:', error);
        }
    };

    // 즐겨찾기 해제
    const handleLikeUnApply = async () => {
        try {
            await LikeUnApply(props.albumId);
            dispatch(InitializeAlbumList());
            dispatch(GetAlbumList(null, 10)); // 앨범 목록 갱신
            dispatch(InitializeLikeList());
            dispatch(SearchAlbumLike(null, 10));
        } catch (error) {
            console.error('좋아요 해제 에러:', error);
        }
    };

    const handleLike = () => {
        if (props.searchedAlbumMarkedStatus === "MARKED") {
            handleLikeUnApply();
        } else if (props.searchedAlbumMarkedStatus === "UNMARKED") {
            handleLikeApply();
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        style={styles.heartIcon}
                        onPress={handleLike}>
                        <Image
                            style={{ width: 16, height: 14 }}
                            source={
                                (props.searchedAlbumMarkedStatus === "UNMARKED")
                                    ? require('../assets/icon/heart_off.png')
                                    : require('../assets/icon/heart_on.png')
                            }
                        />
                    </TouchableOpacity>
                    <Image
                        style={styles.folder_image}
                        source={require('../assets/icon/folder.png')}
                    />
                </View>
                <TouchableOpacity onPress={props.AlbumItemAccess}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title_text}>{props.searchedAlbumName}</Text>
                        {
                            String(props.searchedAlbumStatus) === "PRIVATE" ?
                                <Text style={styles.type_text1}>개인앨범</Text> :
                                <Text style={styles.type_text2}>공유앨범</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
                props.setAlbumId(props.albumId);
                props.setKebabVisible(true);
            }}>
                <Image
                    style={styles.kebab_image}
                    source={require('../assets/icon/kebab.png')}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '97%',
        alignItems: 'center',
        padding: 8,
        marginLeft: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        marginVertical: 7,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: 60,
        height: 60,
    },
    folder_image: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
    },
    heartIcon: {
        position: 'absolute',
        top: 17,
        left: 6,
        zIndex: 1,
    },
    textContainer: {
        marginLeft: 20,
    },
    title_text: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    type_text1: {
        backgroundColor: '#A0B59C',
        borderRadius: 5,
        fontSize: 10,
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 4,
        textAlign: 'center'
    },
    type_text2: {
        backgroundColor: '#E2DD8D',
        borderRadius: 5,
        fontSize: 11,
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 4,
        textAlign: 'center'
    },
    kebab_image: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    }
});

export default AlbumItem;

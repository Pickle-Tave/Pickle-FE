import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { InitializeSearchedHashtag } from '../src/actions/SearchHashtagAction';
import { SearchHashTagImages } from '../api/SearchHashtagImages';
import ImgEnlargeModal from '../components/Modal/ImgEnlargeModal';

const SearchHashTag = ({ route }) => {
    const { searchHashtag, id } = route.params;
    const dispatch = useDispatch();

    //검색한 해시태그 이미지 리스트
    const searchedHashtagList = useSelector((state) => state.SearchHashTagReducer);

    //모달 visible 
    const [imgEnlargeVisible, setImgEnlargeVisible] = useState(false);

    // 현재 선택된 이미지 정보 저장(이미지를 크게 보기 위해서)
    const [selectedImageSrc, setSelectedImageSrc] = useState(null);

    // 로딩 상태를 나타내기 위한 변수
    const [isLoading, setIsLoading] = useState(false);

    //페이지가 마운트되는 순간 검색 요청
    useEffect(() => {
        handleHashtagSearch();
    }, []);

    const handleHashtagSearch = () => {
        if (searchHashtag.trim() && !isLoading) {
            setIsLoading(true);
            console.log("첫 검색 요청!!");
            dispatch(InitializeSearchedHashtag());
            dispatch(SearchHashTagImages(null, 50, id, searchHashtag))
                .then(() => {
                    if (searchedHashtagList.searchHashtagList.length === 0) {
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        }
    };

    //추가 검색 요청
    const fetchMoreSearchedHashtags = () => {
        if (isLoading || !searchHashtag.trim() || searchedHashtagList.last || searchedHashtagList.searchHashtagList.length === 0) {
            return;
        }

        setIsLoading(true);
        console.log("추가 요청!!");
        dispatch(SearchHashTagImages(searchedHashtagList.lastImageId, 10, id, searchHashtag))
            .then(() => {
                if (searchedHashtagList.searchHashtagList.length === 0 || searchedHashtagList.last) {
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setIsLoading(false);
            });
    };

    const renderItem = ({ item }) => (
        <View style={styles.picture_container}>
            <Text style={styles.hash_text}>{item.tagName ? `#${item.tagName}` : '#해시태그'}</Text>
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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ImgEnlargeModal
                visible={imgEnlargeVisible}
                onClose={() => setImgEnlargeVisible(false)}
                imageSrc={selectedImageSrc}
            />
            <View style={styles.headerContainer}>
                <Text style={styles.title}>"{searchHashtag} 에 대한 검색결과..."</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={searchedHashtagList.searchHashtagList}
                    renderItem={renderItem}
                    keyExtractor={item => item.imageId.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.image_list}
                    onEndReached={fetchMoreSearchedHashtags}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: 'white',
    },
    listContainer: {
        flex: 1,
        position: 'relative',
    },
    headerContainer: {
        marginTop: 20,
        marginHorizontal: 15,
        marginBottom: 5,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    image_list: {
        paddingLeft: 8,
    },
    row: {
        justifyContent: 'space-between',
    },
    picture_container: {
        flex: 1,
        marginBottom: 10,
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
    },
});

export default SearchHashTag;

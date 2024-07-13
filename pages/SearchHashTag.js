import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { InitializeSearchedHashtag } from '../src/actions/SearchHashtagAction';
import { SearchHashTagImages } from '../api/SearchHashtagImages';
import ImgEnlargeModal from '../components/Modal/ImgEnlargeModal';

const SearchHashTag = ({ route, navigation }) => {
    const { searchHashtag, id } = route.params;
    console.log("전달받은 해시태그 검색어", searchHashtag)

    const dispatch = useDispatch();

    //검색한 해시태그 이미지 리스트
    const searchedHashtagList = useSelector((state) => state.SearchHashTagReducer);

    //모달 visible 
    const [imgEnlargeVisible, setImgEnlargeVisible] = useState(false);

    // 로딩 상태를 나타내기 위한 변수
    const [isLoading, setIsLoading] = useState(false);

    //페이지가 마운트되는 순간 검색 요청
    useEffect(() => {
        handleHashtagSearch();
    }, [])

    const handleHashtagSearch = () => {
        if (searchHashtag.trim() && !isLoading) {
            setIsLoading(true); // 검색 중
            console.log("첫 검색 요청!!");
            dispatch(InitializeSearchedHashtag())
            dispatch(SearchHashTagImages(null, 10, id, searchHashtag))
                .then(() => {
                    // 빈 배열로 응답받았을 때 로딩 상태를 해제하고 추가 요청 방지
                    if (searchedHashtagList.searchHashtagList.length === 0) {
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                })
        }
    }

    //추가 검색 요청
    const fetchMoreSearchedHashtags = () => {
        // 로딩 중이거나 검색어가 없거나 마지막 페이지에 도달한 경우 추가 요청 방지
        if (isLoading || !searchHashtag.trim() || searchedHashtagList.last || searchedHashtagList.searchHashtagList.length === 0) {
            return;
        }

        setIsLoading(true); // 로딩 시작
        console.log("추가 요청!!");
        dispatch(SearchHashTagImages(searchedHashtagList.lastImageId, 10, id, searchHashtag))
            .then(() => {
                // 빈 배열로 응답받았을 때 추가 요청 차단
                if (searchedHashtagList.searchHashtagList.length === 0 || searchedHashtagList.last) {
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setIsLoading(false); // 에러 발생 시 로딩 해제
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ImgEnlargeModal
                visible={imgEnlargeVisible}
                onClose={() => setImgEnlargeVisible(false)}
            // imageSrc={selectedImageSrc} 
            />
            <View>
                <Text>"{searchHashtag} 에 대한 겸색결과..."</Text>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
   
});

export default SearchHashTag;
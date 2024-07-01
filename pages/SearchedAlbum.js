import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import AlbumItem from '../components/AlbumItem';
import AlbumPlus from '../components/Modal/AlbumPlus';
import KebabModal from '../components/Modal/KebabModal';
import AlbumShareModal from '../components/Modal/AlbumShareModal';
import AlbumEditModal from '../components/Modal/AlbumEditModal';
import DeleteWarnModal from '../components/Modal/DeleteWarnModal';
import { useDispatch, useSelector } from 'react-redux';
import { SearchAlbumName } from '../api/SearchAlbumName';
import { InitializeSearchedAlbum } from '../src/actions/SearchedAlbumAction';

const SearchedAlbum = ({ route, navigation }) => {
    const { searchQuery } = route.params;
    const searchedAlbumList = useSelector((state) => state.SearchedAlbumReducer);

    const dispatch = useDispatch();

    // 현재 선택된 앨범 id
    const [checkedAlbumId, setcheckedAlbumId] = useState(null);

    // 모달 visible state
    const [plusvisible, setPlusVisible] = useState(false);
    const [kebabvisible, setKebabVisible] = useState(false);
    const [editvisible, setEditVisible] = useState(false);
    const [sharevisible, setShareVisible] = useState(false);
    const [deletewarnvisible, setDeleteWarnVisible] = useState(false);

    // 로딩 상태를 나타내기 위한 변수
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !searchedAlbumList.searchedAlbumList.length) {
            handleAlbumSearch();
        }
    }, []);

    const handleAlbumSearch = () => {
        if (searchQuery.trim() && !isLoading) {
            try {
                setIsLoading(true); // 검색 중
                console.log("첫 검색 요청!!");
                dispatch(InitializeSearchedAlbum());
                dispatch(SearchAlbumName(searchQuery, null, 10))
                    .then(() => setIsLoading(false)) // 로딩 완료
                    .catch((error) => {
                        setIsLoading(false); // 에러 발생 시 로딩 해제
                        console.error('앨범 검색 에러:', error);
                    });
            } catch (error) {
                setIsLoading(false);
                console.error('앨범 검색 에러:', error);
            }
        }
    };

    const fetchMoreSearchedAlbums = () => {
        if (isLoading || !searchQuery || searchedAlbumList.last) {
            return; // 이미 로딩 중이거나 검색어가 없거나 마지막 페이지에 도달한 경우 추가 요청 방지
        }

        setIsLoading(true); // 로딩 시작
        console.log("추가 요청!!");
        dispatch(SearchAlbumName(searchQuery, searchedAlbumList.lastAlbumId, 10))
            .then(() => setIsLoading(false)) // 로딩 완료
            .catch((error) => {
                setIsLoading(false); // 에러 발생 시 로딩 해제
                console.error('앨범 목록 추가 요청 에러:', error);
            });
    };

    const AlbumItemAccess = (id) => {
        navigation.navigate('AlbumInquiry', { id });
    };

    // 수정 버튼 클릭시 kebab 모달이 사라지고 share 모달이 뜸
    const ShareModal = () => {
        setKebabVisible(false);
        setShareVisible(true);
    };

    // 공유 버튼 클릭시 kebab 모달이 사라지고 edit 모달이 뜸
    const EditModal = () => {
        setKebabVisible(false);
        setEditVisible(true);
    };

    const DeleteWarn = () => {
        setKebabVisible(false);
        setDeleteWarnVisible(true);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <AlbumPlus
                visible={plusvisible}
                onClose={() => setPlusVisible(false)}
            />
            <KebabModal
                visible={kebabvisible}
                onClose={() => setKebabVisible(false)}
                EditModal={() => EditModal(checkedAlbumId)}
                ShareModal={ShareModal}
                DeleteWarn={DeleteWarn}
                CopyAlbum={() => handleCopyAlbum(checkedAlbumId)} // 복제 기능 추가
            />
            <AlbumEditModal
                visible={editvisible}
                onClose={() => setEditVisible(false)}
                checkedAlbumId={checkedAlbumId}
                searchQuery={searchQuery}
            />
            <AlbumShareModal visible={sharevisible} onClose={() => setShareVisible(false)} />
            <DeleteWarnModal
                visible={deletewarnvisible}
                onClose={() => setDeleteWarnVisible(false)}
            />
            <View style={styles.content}>
                {isLoading && !searchedAlbumList.searchedAlbumList.length ? (
                    <ActivityIndicator size="large" color="gray" />
                ) : (
                    <>
                        <Text style={styles.title}>Search Results for "{searchQuery}"</Text>
                        <FlatList
                            data={searchedAlbumList.searchedAlbumList}
                            keyExtractor={(item) => item.albumId.toString()}
                            renderItem={({ item }) => (
                                <AlbumItem
                                    {...item}
                                    kebabvisible={kebabvisible}
                                    setKebabVisible={setKebabVisible}
                                    AlbumItemAccess={() => AlbumItemAccess(item.albumId)}
                                    setAlbumId={setcheckedAlbumId}
                                />
                            )}
                            ListEmptyComponent={<Text>No albums found</Text>}
                            onEndReached={fetchMoreSearchedAlbums} // 끝에 도달하면 추가 데이터 요청
                            onEndReachedThreshold={0.1} // 끝에서 얼마나 멀리 있을 때 호출할 지 비율로 설정
                            ListFooterComponent={() => ( // 로딩 중임을 나타내는 컴포넌트
                                isLoading && (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="small" color="gray" />
                                    </View>
                                )
                            )}
                        />
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default SearchedAlbum;

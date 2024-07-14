import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Platform } from 'react-native';
import AlbumItem from '../components/AlbumItem';
import AlbumPlus from '../components/Modal/AlbumPlus';
import KebabModal from '../components/Modal/KebabModal';
import AlbumShareModal from '../components/Modal/AlbumShareModal';
import AlbumEditModal from '../components/Modal/AlbumEditModal';
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

    // 로딩 상태를 나타내기 위한 변수
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleAlbumSearch();
    }, []);

    const handleAlbumSearch = () => {
        if (searchQuery.trim() && !isLoading) {
            setIsLoading(true); 
            console.log("첫 검색 요청!!");
            dispatch(InitializeSearchedAlbum());
            dispatch(SearchAlbumName(searchQuery, null, 10))
                .then(() => {
                    if (searchedAlbumList.searchedAlbumList.length === 0) {
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    setIsLoading(false); 
                });
        }
    };

    const fetchMoreSearchedAlbums = () => {
        if (isLoading || !searchQuery.trim() || searchedAlbumList.last || searchedAlbumList.searchedAlbumList.length === 0) {
            return;
        }

        setIsLoading(true);
        console.log("추가 요청!!");
        dispatch(SearchAlbumName(searchQuery, searchedAlbumList.lastAlbumId, 10))
            .then(() => {
                if (searchedAlbumList.searchedAlbumList.length === 0 || searchedAlbumList.last) {
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setIsLoading(false); 
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

    // 앨범 수정 후 검색 앨범 리스트를 다시 요청하는 함수
    const handleUpdate = () => {
        handleAlbumSearch();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <AlbumPlus
                visible={plusvisible}
                onClose={() => setPlusVisible(false)}
                searchQuery={searchQuery}
            />
            <KebabModal
                visible={kebabvisible}
                onClose={() => setKebabVisible(false)}
                EditModal={() => EditModal(checkedAlbumId)}
                ShareModal={ShareModal}
                DeleteWarn={DeleteWarn}
                searchQuery={searchQuery}
                checkedAlbumId={checkedAlbumId}
            />
            <AlbumEditModal
                visible={editvisible}
                onClose={() => setEditVisible(false)}
                checkedAlbumId={checkedAlbumId}
                onUpdate={handleUpdate}
                searchQuery={searchQuery}
            />
            <AlbumShareModal
                visible={sharevisible}
                onClose={() => setShareVisible(false)}
                searchQuery={searchQuery}
                checkedAlbumId={checkedAlbumId}           
                />
            <View style={styles.content}>
                {isLoading && !searchedAlbumList.searchedAlbumList.length ? (
                    <ActivityIndicator size="large" color="gray" />
                ) : (
                    <>
                        <Text style={styles.title}>"{searchQuery} 에 대한 검색결과..."</Text>
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
                                    searchQuery={searchQuery}
                          
                                />
                            )}
                            ListEmptyComponent={<Text>앨범을 찾을 수 없습니다!!</Text>}
                            onEndReached={fetchMoreSearchedAlbums}
                            onEndReachedThreshold={0.1} 
                            ListFooterComponent={() => (
                                searchedAlbumList.last ? null : (
                                    isLoading && (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator size="small" color="gray" />
                                        </View>
                                    )
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
    loadingContainer: {
        marginTop: 10,
    },
});

export default SearchedAlbum;

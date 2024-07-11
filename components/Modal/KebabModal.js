import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { AlbumDelete } from '../../api/AlbumDelete';
import { GetAlbumList } from '../../api/GetAlbumList';
import { InitializeAlbumList } from '../../src/actions/AlbumListAction';
import { SearchAlbumStatus } from '../../api/SearchAlbumStatus';
import { InitializeLikeList } from '../../src/actions/AlbumLikeAction';
import { InitializeAlbumStatus } from '../../src/actions/AlbumStatusAction';
import { SearchAlbumLike } from '../../api/SearchAlbumLike';
import { useDispatch } from 'react-redux';
import { InitializeSearchedAlbum } from '../../src/actions/SearchedAlbumAction';
import { SearchAlbumName } from '../../api/SearchAlbumName';

const KebabModal = ({ visible, onClose, ShareModal, EditModal, dropdownValue, CopyAlbum, checkedAlbumId, searchQuery }) => {
    const dispatch = useDispatch();

    //앨범 삭제 요청
    const handleAlbumDelete = async () => {
        try {
            await AlbumDelete(checkedAlbumId);
            dispatch(InitializeAlbumList());
            dispatch(GetAlbumList(null, 10));

            dispatch(InitializeSearchedAlbum());
            dispatch(SearchAlbumName(searchQuery, null, 10))

            if (dropdownValue === 2) {
                dispatch(SearchAlbumStatus('PRIVATE', null, 10));
                dispatch(InitializeAlbumStatus());
            } else if (dropdownValue === 3) {
                dispatch(SearchAlbumStatus('PUBLIC', null, 10));
                dispatch(InitializeAlbumStatus());
            } else if (dropdownValue === 4) {
                dispatch(InitializeLikeList());
                dispatch(SearchAlbumLike(null, 10));
            }

            onClose();
        } catch (error) {
            console.error('앨범 삭제 중 오류:', error);
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.modal_section1}>
                                <TouchableOpacity onPress={EditModal}>
                                    <Text style={styles.text1}>수정</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={CopyAlbum}>
                                    <Text style={styles.text1}>복제</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ShareModal}>
                                    <Text style={styles.text2}>공유</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleAlbumDelete}>
                                    <Text style={styles.text3}>삭제</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onClose}>
                                    <Text style={styles.text4}>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        marginTop: 440,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#F7F8CB',
        borderWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    modal_section1: {
        marginVertical: 15,
        width: '100%',
        textAlign: 'center'

    },
    text1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        borderBottomColor: '#F7F8CB',
        borderBottomWidth: 3,
        paddingBottom: 10,
    },
    text2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        borderBottomColor: '#F7F8CB',
        borderBottomWidth: 3,
        paddingBottom: 10
    },
    text3: {
        fontSize: 18,
        marginBottom: 15,
        color: 'red',
        textAlign: 'center',
        borderBottomColor: '#F7F8CB',
        borderBottomWidth: 3,
        paddingBottom: 10
    },
    text4: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 0,
        textAlign: 'center'
    }
});

export default KebabModal;

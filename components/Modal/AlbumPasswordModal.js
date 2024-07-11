import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { ShareParticipants } from '../../api/ShareParticipants';
import { InitializeAlbumList } from '../../src/actions/AlbumListAction';
import { GetAlbumList } from '../../api/GetAlbumList';
import { InitializeAlbumStatus } from '../../src/actions/AlbumStatusAction';
import { SearchAlbumStatus } from '../../api/SearchAlbumStatus';
import { InitializeLikeList } from '../../src/actions/AlbumLikeAction';
import { SearchAlbumLike } from '../../api/SearchAlbumLike';

const AlbumPasswordModal = ({ visible, onClose, dropdownValue }) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [sharecode, setShareCode] = useState('');

    //공유앨범 참여 요청 코드
    const handleSubmit = async () => {
        try {
            await ShareParticipants(sharecode, password);
            
            if (dropdownValue === 1) {
                dispatch(InitializeAlbumList());
                dispatch(GetAlbumList(null, 10));
            } else if (dropdownValue === 2) {
                dispatch(InitializeAlbumStatus());
                dispatch(SearchAlbumStatus('PRIVATE', null, 10));
            } else if (dropdownValue === 3) {
                dispatch(InitializeAlbumStatus());
                dispatch(SearchAlbumStatus('PUBLIC', null, 10));
            } else if (dropdownValue === 4) {
                dispatch(InitializeLikeList());
                dispatch(SearchAlbumLike(null, 10));
            }
            onClose();
            setPassword('');
            setShareCode('');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert('Error', '잘못된 요청입니다. 입력한 정보를 다시 확인하세요.');
            } else {
                Alert.alert('Error', '알 수 없는 오류가 발생했습니다.');
            }
        }
    };

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
                            <Text style={styles.modalTitle}>공유앨범 참여하기</Text>
                            <Text style={styles.modalSubTitle}>참여코드를 입력하세요</Text>
                            <TextInput
                                style={styles.textInput}
                                value={sharecode}
                                onChangeText={setShareCode}
                            />
                            <Text style={styles.modalSubTitle}>Password를 입력하세요</Text>
                            <TextInput
                                style={styles.textInput}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={styles.modalButtonContainer1}>
                                    <Text style={styles.modalButton}>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.modalButtonContainer2}>
                                    <Text style={styles.modalButton}>완료</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        alignItems: 'center',
        borderColor: '#F7F8CB',
        borderWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 13,
        marginTop: 9,
        alignItems: 'center',
        color: 'black',
    },
    modalSubTitle: {
        fontSize: 15,
        marginBottom: 10,
        alignItems: 'center',
        color: 'black',
        marginTop: 12,
    },
    textInput: {
        height: 35,
        borderWidth: 1,
        width: '85%',
        borderRadius: 30,
        paddingLeft: 15,
        marginTop: 6,
        fontSize: 13,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
        borderTopColor: '#CCCCCC',
        borderTopWidth: 1,
    },
    modalButtonContainer1: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 5,
        borderRightColor: '#CCCCCC',
        borderRightWidth: 1,
    },
    modalButtonContainer2: {
        width: '50%',
        alignItems: 'center',
        paddingTop: 15,
    },
    modalButton: {
        fontSize: 16,
        color: 'black',
    },
});

export default AlbumPasswordModal;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, Clipboard, Alert } from 'react-native';
import { ShareAlbumChange } from '../../api/ShareAlbumChange';
import { InitializeAlbumList } from '../../src/actions/AlbumListAction';
import { GetAlbumList } from '../../api/GetAlbumList';
import { InitializeLikeList } from '../../src/actions/AlbumLikeAction';
import { SearchAlbumLike } from '../../api/SearchAlbumLike';
import { SearchAlbumStatus } from '../../api/SearchAlbumStatus';
import { InitializeAlbumStatus } from '../../src/actions/AlbumStatusAction';
import { InitializeSearchedAlbum } from '../../src/actions/SearchedAlbumAction';
import { SearchAlbumName } from '../../api/SearchAlbumName';
import { useDispatch } from 'react-redux';

const AlbumShareModal = ({ visible, onClose, checkedAlbumId, dropdownValue, searchQuery }) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shareLink, setShareLink] = useState('참여코드');
    const [secure, setSecure] = useState(true);

    const handleShare = async () => {
        if (password.length < 4) {
            Alert.alert('비밀번호 오류', '비밀번호는 4글자 이상이어야 합니다.');
           setPassword('');
            return; 
        }

        setIsLoading(true);
        try {
            const response = await ShareAlbumChange(checkedAlbumId, password);
            setShareLink(response.data.link);


            if (searchQuery) {
                dispatch(InitializeSearchedAlbum());
                dispatch(SearchAlbumName(searchQuery, null, 10));
            }

            if (dropdownValue === 1) {
                dispatch(InitializeAlbumList());
                dispatch(GetAlbumList(null, 10));
            } else if (dropdownValue === 2) {
                dispatch(InitializeAlbumStatus());
                dispatch(SearchAlbumStatus('PRIVATE', null, 10));
            } else if (dropdownValue === 4) {
                dispatch(InitializeLikeList());
                dispatch(SearchAlbumLike(null, 10))

            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyLink = () => {
        Clipboard.setString(shareLink);
        Alert.alert("코드 복사", "참여코드가 클립보드에 복사되었습니다.");
    };


    const handleClose = () => {
        setPassword('');  
        setShareLink('참여코드');
        onClose(); 
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true} 
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>앨범 공유하기</Text>
                            <Text style={styles.textLeftAlign}>Password를 입력하세요.</Text>
                            <View style={styles.password_section}>
                                <View style={{
                                    flexDirection: 'row', borderWidth: 1,
                                    borderRadius: 20,
                                    width: '90%',
                                    height: 35,
                                }}>
                                    <TextInput
                                        style={styles.textinput}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={secure} // 비밀번호 입력 시 텍스트 가리기
                                        onSubmitEditing={handleShare}
                                    />
                                    <TouchableOpacity
                                        style={styles.toggleButton}
                                        onPress={() => setSecure(!secure)}>
                                        <Image style={{ width: 18, height: 12, justifyContent: 'center' }} source={require('../../assets/icon/eye.png')} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.done_btn} onPress={handleShare}>
                                    <Text style={styles.done_text}>완료</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.link_section}>
                                <Text style={{ width: '100%', borderBottomWidth: 1 }}>
                                    {isLoading ? '참여코드를 생성중입니다...' : `${shareLink}`}
                                </Text>
                                <TouchableOpacity onPress={handleCopyLink}>
                                    <Image style={{ width: 23, height: 23 }} source={require('../../assets/icon/copy.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={handleClose} style={styles.modalButtonContainer1}>
                                    <Text style={styles.modalButton}>취소</Text>
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
        padding: 20,
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
        marginBottom: 16,
        alignItems: 'center',
        color: 'black',
        marginTop: 7,
    },
    textLeftAlign: {
        width: '100%',
        textAlign: 'left',
        marginTop: 10,
    },
    password_section: {
        width: '90%',
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
        justifyContent: 'center'
    },
    textinput: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        lineHeight: 20,
        fontSize: 14,
    },
    done_btn: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        height: 35,
        marginBottom: 20,
    },
    done_text: {
        color: 'white',
    },
    link_section: {
        width: '90%',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        marginTop: 12,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 30,
    },
    modalButtonContainer1: {
        alignItems: 'center',
    },
    modalButton: {
        fontSize: 15,
        color: 'black',
    },
    toggleButton: {
        position: 'absolute',
        right: 10, 
        justifyContent: 'center', 
        top: 10
    }
});

export default AlbumShareModal;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';

const AlbumShareModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true} // 배경을 투명하게 설정
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>앨범 공유하기</Text>
                            <Text style={styles.textLeftAlign}>Password를 입력하세요.</Text>
                            <View style={styles.password_section}>
                                <TextInput style={styles.textinput} />
                                <TouchableOpacity style={styles.done_btn}>
                                    <Text style={styles.done_text}>완료</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.link_section}>
                                <Text style={{ width: '100%', borderBottomWidth: 1, }}>링크</Text>
                                <TouchableOpacity>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/icon/copy.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={onClose} style={styles.modalButtonContainer1}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명하게 설정
    },
    modalContainer: {
        width: '85%', // 모달 너비 설정
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
        marginBottom: 10,
        alignItems: 'center',
        color: 'black'
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
        borderWidth: 1,
        borderRadius: 20,
        width: '90%',
        height: 35,
    },
    done_btn: {
        backgroundColor: 'black',
        justifyContent: 'center', // 추가: 세로축 중앙 정렬
        alignItems: 'center', // 추가: 세로축 중앙 정렬
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
        marginTop: 7,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 30,
    },
    modalButtonContainer1: {
        alignItems: 'center', // 중앙 정렬
    },
    modalButton: {
        fontSize: 16,
        color: 'black',
    },
});

export default AlbumShareModal;

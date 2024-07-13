import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const DeleteWarnModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true} // 배경을 투명하게 설정
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.title_section}>
                                <Image style={{ width: 26, height: 20, resizeMode: 'contain', marginRight: 1, }} source={require('../../assets/icon/warn.png')} />
                                <Text style={styles.modalTitle}>경고</Text>
                            </View>
                            <Text style={styles.textLeftAlign}>공유앨범은 호스트만 삭제 가능합니다!</Text>
                            <TouchableOpacity style={styles.close_btn} onPress={onClose}>
                                <Text style={{ color: 'black' }}>닫기</Text>
                            </TouchableOpacity>
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
        padding: 15,
        alignItems: 'center',
        borderColor: '#F7F8CB',
        borderWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title_section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 7,
        alignItems: 'center',
        color: 'red'
    },
    textLeftAlign: {
        width: '100%',
        textAlign: 'center',
        marginTop: 12,
        color: 'black'
    },
    close_btn: {
        marginTop: 25,
        alignSelf: 'flex-end', // 추가: 닫기 버튼을 오른쪽으로 정렬
    }
});

export default DeleteWarnModal;



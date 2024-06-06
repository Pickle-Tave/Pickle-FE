import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';

const KebabModal = ({ visible, onClose, ShareModal, EditModal }) => {
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
                            <View style={styles.modal_section1}>
                                <TouchableOpacity onPress={EditModal}>
                                    <Text style={styles.text1}>수정</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ShareModal}>
                                    <Text style={styles.text2}>공유</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명하게 설정
    },
    modalContainer: {
        width: '90%', // 모달 너비 설정
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

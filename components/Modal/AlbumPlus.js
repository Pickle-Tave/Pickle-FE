import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';

const AlbumPlus = ({ visible, onClose }) => {
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
                            <Text style={styles.modalTitle}>새로운 앨범</Text>
                            <Text style={styles.modalSubTitle}>앨범의 이름을 입력하세요.</Text>
                            <TextInput style={styles.text_input} placeholder='제목'/>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={onClose} style={styles.modalButtonContainer1}>
                                    <Text style={styles.modalButton}>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onClose} style={styles.modalButtonContainer2}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명하게 설정
    },
    modalContainer: {
        width: '85%', // 모달 너비 설정
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
        marginBottom: 10,
        alignItems: 'center',
        color: 'black'
    },
    modalSubTitle: {
        fontSize: 16,
        marginBottom: 10,
        alignItems: 'center',
        color: 'black',
        
    },
    text_input:{
        height: 38,
        borderWidth: 1,
        width: '90%',
        borderRadius: 30,
        paddingLeft: 15,
        marginTop: 6,
        fontSize: 13,
        marginBottom: 10,
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
        width: '50%', // 너비를 50%로 설정
        height: '100%',
        alignItems: 'center', // 중앙 정렬
        marginTop: 10,
        paddingTop: 5,
        borderRightColor: '#CCCCCC',
        borderRightWidth: 1,
    },
    modalButtonContainer2: {
        width: '50%', // 너비를 50%로 설정
        alignItems: 'center', // 중앙 정렬
        paddingTop: 15,
    },
    modalButton: {
        fontSize: 16,
        color: 'black',
    },
});

export default AlbumPlus;
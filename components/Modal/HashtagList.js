import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';

const HashtagList = ({ visible, onClose }) => {
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
                            <Text style={styles.modalTitle}>해시태그 목록</Text>
                            <View style={styles.hashList}>
                                <Text style={styles.hashText}>#동물</Text>
                                <Text style={styles.hashText}>#여행</Text>
                                <Text style={styles.hashText}>#일상</Text>
                                <Text style={styles.hashText}>#청춘</Text>
                                <Text style={styles.hashText}>#행복</Text>
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
        width: '90%', // 모달 너비 설정
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'center',
    },
    hashList: {
        width: '95%',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'center', // 가로축 기준 중앙 정렬
        alignItems: 'center', // 세로축 기준 중앙 정렬
        marginTop: 15,
    },
    hashText: {
        fontSize: 15,
        marginHorizontal: 2.5, // 해시태그 간 간격 추가
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 20,
    },
    modalButtonContainer1: {
        alignItems: 'center', // 중앙 정렬
    },
    modalButton: {
        fontSize: 16,
        color: 'black',
    },
});

export default HashtagList;

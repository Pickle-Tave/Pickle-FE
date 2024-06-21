import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const ImgDeleteModal = ({ visible, onClose, imageSrc }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true} // 배경을 투명하게 설정
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={{alignItems: 'flex-end', marginRight: 20}} onPress={onClose}>
                            <Text style={{fontSize: 18, marginTop: 10,}}>x</Text>
                        </TouchableOpacity>
                        {/* 이미지띄우기 */}
                        {imageSrc && <Image style={styles.enlargedImage} source={imageSrc} />}
                    </View>
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
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#F7F8CB',
        borderWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    enlargedImage: {
        width: '100%',
        height: '85%',
        resizeMode: 'contain'
    },
});

export default ImgDeleteModal;

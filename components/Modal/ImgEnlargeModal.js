import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const ImgDeleteModal = ({ visible, onClose, imageSrc }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true} 
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 20 }} onPress={onClose}>
                            <Image style={{ width: 15, height: 15, marginTop: 9, }} source={require('../../assets/icon/cancel2.png')} />
                        </TouchableOpacity>
                        {imageSrc && <Image style={styles.enlargedImage} source={{ uri: imageSrc }} />}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContainer: {
        width: '85%', 
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
        paddingVertical: 5,
    },
    enlargedImage: {
        width: '100%',
        height: '85%',
        resizeMode: 'contain',
        marginVertical: 10,
    },
});

export default ImgDeleteModal;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const ImgDeleteModal = ({ visible, onClose, onDelete, selectedImageNum }) => {
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
                            <Text style={styles.modalTitle}>사진 삭제하기</Text>
                            <Text style={styles.modalSubTitle}>선택한 {selectedImageNum}개의 사진을 삭제하시겠습니까?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={onClose} style={styles.modalButtonContainer1}>
                                    <Text style={styles.modalButton}>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onDelete} style={styles.modalButtonContainer2}>
                                    <Text style={styles.modalButton}>삭제</Text>
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
        marginBottom: 16,
        alignItems: 'center',
        color: 'black',
        marginTop: 7,
    },
    modalSubTitle: {
        fontSize: 16,
        marginBottom: 13,
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

export default ImgDeleteModal;

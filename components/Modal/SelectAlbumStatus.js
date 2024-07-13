import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const SelectAlbumStatus = ({ visible, onClose, PublicAlbum, PrivateAlbum }) => {

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
                            <View style={styles.modal_section1}>
                                <TouchableOpacity onPress={PrivateAlbum}>
                                    <Text style={styles.text1}>개인앨범 생성하기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={PublicAlbum}>
                                    <Text style={styles.text4}>공유앨범 참여하기</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '83%',
        marginTop: 40,
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

export default SelectAlbumStatus;

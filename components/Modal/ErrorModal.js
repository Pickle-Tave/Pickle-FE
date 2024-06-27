// components/ErrorModal.js
import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

const ErrorModal = ({ visible, title, content, onClose }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                    <Text style={{ marginBottom: 10, fontSize: 18 }}>{title}</Text>
                    <Text>{content}</Text>
                    <Button title="닫기" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

export default ErrorModal;

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addHashTag, deleteHashTag } from '../../src/actions/HashTagAction';

const HashtagMake = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const hashtagList = useSelector((state) => state.HashTagReducer);
    const [newHashTag, setNewHashTag] = useState('');
    const [nextId, setNextId] = useState(hashtagList.length + 1);

    const handleAddHashTag = () => {
        if (newHashTag.trim() !== '') {
            dispatch(addHashTag(nextId, newHashTag));
            setNewHashTag('');
            setNextId(nextId + 1);
        }
    };

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
                            <Text style={styles.modalTitle}>#해시태그 만들기</Text>
                            <Text style={styles.modalSubtitle}>#해시태그를 입력하세요</Text>
                            <View style={styles.Modal_input_section}>
                                <TextInput
                                    style={styles.modalInput}
                                    value={newHashTag}
                                    onChangeText={setNewHashTag}
                                />
                                <TouchableOpacity style={styles.Modal_plus} onPress={handleAddHashTag}>
                                    <Text style={styles.plusText}>추가</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.HashtagList}>
                                {hashtagList.map((item) => (
                                    <View key={item.id} style={styles.hashtagItem}>
                                        <Text style={styles.text}>
                                            {`#${item.text}`}
                                        </Text>
                                        <TouchableOpacity onPress={() => dispatch(deleteHashTag(item.id))}>
                                            <Text style={{ marginLeft: 5, alignItems: 'center' }}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
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
    modalSubtitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    Modal_input_section: {
        marginTop: 7,
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center', // 수직 중앙 정렬
        justifyContent: 'center',
    },
    modalInput: {
        height: 35,
        borderColor: 'gray',
        borderWidth: 2,
        width: '80%',
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 30,
        fontSize: 12,
    },
    Modal_plus: {
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
    plusText: {
        color: 'white',
    },
    HashtagList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 7,
    },
    hashtagItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 11,
        paddingVertical: 5,
        margin: 5,
        width: 'auto'
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
    text: {
        fontSize: 13,
        color: 'black'
    }
});

export default HashtagMake;

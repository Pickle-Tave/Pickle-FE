import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HashTagCreate } from '../../api/HashTagCreate';
import { HashTagListCheck } from '../../api/HashTagListCheck';
import { HashTagDelete } from '../../api/HashTagDelete';

const HashtagMake = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const hashtagList = useSelector((state) => state.HashTagReducer.hashtagList);

    const [newHashTag, setNewHashTag] = useState('');

    const handleAddHashTag = async () => {
        if (newHashTag.trim() !== '') {
            setNewHashTag('');
            await HashTagCreate(newHashTag); //해시태그 생성 
            dispatch(HashTagListCheck()); // 해시태그 목록 다시 불러오기
        }
    };

    const handleHashTagDelete = async (hashtag_id) => {
        console.log('삭제할 해시태그 id: ', hashtag_id);
        await HashTagDelete(hashtag_id);
        dispatch(HashTagListCheck()); // 해시태그 목록 다시 불러오기
    };

    useEffect(() => {
        if (visible) {
            dispatch(HashTagListCheck());
        }
    }, [dispatch, visible]);

    const renderHashTagItem = ({ item }) => (
        <View style={styles.hashtagItem}>
            <Text style={styles.text}>{`#${item.text}`}</Text>
            <TouchableOpacity onPress={() => handleHashTagDelete(item.id)}>
                <Text style={{ marginLeft: 5, alignItems: 'center' }}>X</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
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
                    <FlatList
                        data={hashtagList}
                        renderItem={renderHashTagItem}
                        keyExtractor={item => item.id.toString()}
                        numColumns={3}
                        contentContainerStyle={styles.HashtagList}
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity onPress={onClose} style={styles.modalButtonContainer1}>
                            <Text style={styles.modalButton}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.modalButtonContainer2}>
                            <Text style={styles.modalButton}>완료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#F7F8CB',
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
        marginTop: 7,
        color: 'black',
        alignItems: 'center',
    },
    modalSubtitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    Modal_input_section: {
        marginTop: 7,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    modalInput: {
        width: '80%',
        height: 35,
        paddingLeft: 10,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 30,
        fontSize: 12,
        marginBottom: 20,
        marginRight: 5,
    },
    Modal_plus: {
        backgroundColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        height: 35,
        marginBottom: 20,
    },
    plusText: {
        color: 'white',
    },
    HashtagList: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,
    },
    hashtagItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 11,
        paddingVertical: 5,
        marginVertical: 5,
        marginHorizontal: 7,
        width: 'auto',
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 17,
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        justifyContent: 'space-between',
    },
    modalButtonContainer1: {
        width: '50%',
        alignItems: 'center',
        paddingTop: 5,
        borderRightWidth: 1,
        borderRightColor: '#CCCCCC',
        marginTop: 10,
        height: '100%',
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
    text: {
        fontSize: 13,
        color: 'black',
    },
});

export default HashtagMake;

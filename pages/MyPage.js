/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "react-native-gesture-handler";

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';

//해시태그 만들기 모달
const HashtagMake = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>#해시태그 만들기</Text>
                <Text style={styles.modalSubtitle}>#해시태그를 입력하세요</Text>
                <View style={styles.Modal_input_section}>
                    <TextInput style={styles.modalInput} placeholder="#해시태그" />
                    <TouchableOpacity style={styles.Modal_plus}>
                        <Text style={styles.plusText}>추가</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.HashtagList}>
                    <View style={styles.hashtagItem}><Text>#해시태그 X</Text></View>
                    <View style={styles.hashtagItem}><Text>#해시태그 X</Text></View>
                    <View style={styles.hashtagItem}><Text>#해시태그 X</Text></View>
                    <View style={styles.hashtagItem}><Text>#해시태그 X</Text></View>
                    <View style={styles.hashtagItem}><Text>#해시태그 X</Text></View>
                </ScrollView>
                <View style={styles.modalButtons}>
                    <TouchableOpacity onPress={onClose} style={styles.modalButtonContainer1}>
                        <Text style={styles.modalButton}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.modalButtonContainer2}>
                        <Text style={styles.modalButton}>완료</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const MyPage = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <HashtagMake visible={modalVisible} onClose={() => setModalVisible(false)} />
            <View style={styles.upper_section}>
                <View style={styles.profile_section}>
                    <Image
                        style={styles.user_profile}
                        source={require('.././assets/icon/user_profile.png')}
                    />
                    <View style={styles.name_profile}>
                        <Text style={styles.text1}>닉네임</Text>
                        <Text style={styles.text2}>@태입희</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(true)}>
                    <Text style={styles.hashtag_btn}>
                        #해시태그 만들기
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.middle_section}>
                <TouchableOpacity style={styles.hashtag}>
                    <Image style={{ width: 40, height: 40, marginLeft: 16, }}
                        source={require('../assets/icon/hashtag.png')}
                    />
                    <Text style={styles.text3}>해시태그 목록</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setting}>
                    <Image style={{ width: 40, height: 40, marginLeft: 16, }}
                        source={require('../assets/icon/setting.png')}
                    />
                    <Text style={styles.text3}>환경설정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gonggi}>
                    <Image style={{ width: 30, height: 30, marginLeft: 20, }}
                        source={require('../assets/icon/gonggi.png')}
                    />
                    <Text style={styles.text3}>공지사항</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lower_section}>
                <TouchableOpacity style={styles.logout}>
                    <Image
                        style={{ width: 38, height: 38, marginLeft: 16, }}
                        source={require('../assets/icon/logout.png')}
                    />
                    <Text style={styles.text3}>로그아웃</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.member_out}>
                    <Image
                        style={{ width: 40, height: 40, marginLeft: 16, }}
                        source={require('../assets/icon/member_out.png')}
                    />
                    <Text style={styles.text3}>회원탈퇴</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upper_section: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 0,
    },
    profile_section: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 80,
        alignItems: 'center',
        justifyContent: 'flex-start', // 추가: 왼쪽 정렬
        width: '90%', // 추가: 전체 섹션의 너비 설정
    },
    user_profile: {
        height: 80,
        width: 80,
        marginLeft: 30, // 수정: 왼쪽 여백 설정
    },
    name_profile: {
        justifyContent: 'center',
        marginLeft: 20,
        gap: 5,
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 15,
    },
    buttonContainer: {
        width: '100%',  // 버튼 너비 설정
        alignItems: 'center', // 가로축을 기준으로 중앙 정렬
        marginTop: 22,
    },
    hashtag_btn: {
        backgroundColor: '#FFFDDB',
        color: 'black',
        width: '90%',
        textAlign: 'center',
        borderRadius: 10,
        paddingBottom: 20,
        paddingTop: 20,
        fontSize: 15,
        marginBottom: 35,
    },
    middle_section: {
        width: '100%',
        alignItems: 'center',
    },
    hashtag: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 10,
        height: 65,
        alignItems: 'center', // 세로축 중앙 정렬 추가
    },
    setting: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 7,
        height: 65,
        alignItems: 'center', // 세로축 중앙 정렬 추가
    },
    gonggi: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 7,
        height: 65,
        alignItems: 'center', // 세로축 중앙 정렬 추가
    },
    text3: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 13, // 텍스트 왼쪽 간격 추가
    },
    lower_section: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        height: 500,
    },
    logout: {
        width: '100%',
        flexDirection: 'row',
        height: 55,
        alignItems: 'center', // 세로축 중앙 정렬 추가
    },
    member_out: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
        height: 55,
        alignItems: 'center', // 세로축 중앙 정렬 추가
    },
    modalContainer: {
        display: 'flex',
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#F7F8CB',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        justifyContent: 'space-between', // 공간을 적절히 배치하도록 설정
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'center',
    },
    modalSubtitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    Modal_input_section: {
        marginTop: 10,
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
        width: '85%',
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 30,
        marginLeft: 20,
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
        gap: 4,
    },
    hashtagItem: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        borderTopColor: '#CCCCCC',
        borderTopWidth: 1,
    },
    modalButtonContainer1: {
        width: '50%', // 너비를 50%로 설정
        alignItems: 'center', // 중앙 정렬
        marginTop: 15,
        borderRightColor: '#CCCCCC',
        borderRightWidth: 1,
    },
    modalButtonContainer2: {
        width: '50%', // 너비를 50%로 설정
        alignItems: 'center', // 중앙 정렬
        marginTop: 15,
        
    },
    modalButton: {
        fontSize: 16,
        color: 'black',
    },
});

export default MyPage;

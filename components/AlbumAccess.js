import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const images = [
    { id: '1', hashtag: '해시태그', src: require('../assets/icon/picture.png') },
    { id: '2', hashtag: '해시태그', src: require('../assets/icon/picture.png') },
    { id: '3', hashtag: '해시태그', src: require('../assets/icon/picture.png') },
    { id: '4', hashtag: '해시태그', src: require('../assets/icon/picture.png') },
    { id: '5', hashtag: '해시태그', src: require('../assets/icon/picture.png') },
    { id: '6', hashtag: '해시태그', src: require('../assets/icon/picture.png') },
];

// check가 true일때는 취소버튼,체크박스, 휴지통 생성하기

const AlbumAccess = ({ check, setCheck }) => {
    const renderItem = ({ item }) => (
        <View style={styles.picture_container}>
            <Text style={styles.hash_text}>#{item.hashtag}</Text>
            {check && 
            <BouncyCheckbox 
            style={styles.checkbox}
            size={17}
            fillColor='black'
            unFillColor='transparent'
            iconStyle={{borderColor: 'black'}}
            // onPress
            />
            }
            <Image style={styles.picture} source={item.src} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.upper_section}>
                <Text style={styles.title}>앨범명</Text>
                <TouchableOpacity onPress={() => {
                    check ? setCheck(false) : setCheck(true)
                }}>
                    {check ?
                        <Text style={styles.check_btn}>취소</Text>
                        :
                        <Text style={styles.check_btn}>선택</Text>}
                </TouchableOpacity>
            </View>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.image_list}
            />
            <View style={check ? styles.lower_section1 : styles.lower_section2}>
                {check && 
                <TouchableOpacity>
                    <Image style={{ width: 40, height: 40 }} source={require('../assets/icon/bin.png')}/>
                </TouchableOpacity>
                }
                <TouchableOpacity style={styles.pic_plus}>
                    <Image style={{ width: 45, height: 45 }} source={require('../assets/icon/pic_plus.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    checkbox: {
        position: 'absolute',
        top: 35,
        left: 10,
        zIndex: 1,
    },
    upper_section: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    check_btn: {
        fontSize: 15,
        backgroundColor: '#769370',
        borderRadius: 20,
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 4,
    },
    image_list: {
        paddingLeft: 10,
        paddingTop: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    lower_section1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,

    },
    lower_section2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 20,
        marginTop: 20,

    },
    picture_container: {
        flex: 1,
        position: 'relative',  // 자식 요소의 절대 위치 설정을 위해 필요
    },
    hash_text: {
        fontSize: 14,
        color: 'black',
    },
    picture: {
        width: '95%',
        height: 155,
        resizeMode: 'contain',
        borderRadius: 20,
    },
    pic_plus: {
        marginBottom: 25,
    }
});

export default AlbumAccess;

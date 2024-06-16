import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


const AlbumItem = (props) => {
    const [heart, setHeart] = useState(false);

    const addHeart = () => {
        setHeart(true)
        //앨범 id전달해서 즐겨찾기에 추가하는 코드
    }

    const deleteHeart = () => {
        setHeart(false)
        //앨범 id전달해서 즐겨찾기에 삭제하는 코드
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        style={styles.heartIcon}
                        onPress={() => (heart ? deleteHeart() : addHeart())}>
                        <Image
                            style={{ width: 18, height: 17 }}
                            source={
                                heart
                                    ? require('../assets/icon/heart_on.png')
                                    : require('../assets/icon/heart_off.png')
                            }
                        />
                    </TouchableOpacity>
                    <Image
                        style={styles.folder_image}
                        source={require('../assets/icon/folder.png')}
                    />
                </View>
                <TouchableOpacity onPress={props.AlbumItemAccess}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title_text}>{props.title}</Text>
                        {
                            String(props.type) === "개인앨범" ?
                                <Text style={styles.type_text1}>{props.type}</Text> :
                                <Text style={styles.type_text2}>{props.type}</Text>
                        }

                    </View>
                </TouchableOpacity>

            </View>
            <TouchableOpacity onPress={() => props.setKebabVisible(true)}>
                <Image
                    style={styles.kebab_image}
                    source={require('../assets/icon/kebab.png')}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '97%',
        alignItems: 'center',
        padding: 8,
        marginLeft: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        marginVertical: 7,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: 60,
        height: 60,
    },
    folder_image: {
        width: 68,
        height: 68,
        resizeMode: 'contain',
    },
    heartIcon: {
        position: 'absolute',
        top: 17,
        left: 6,
        zIndex: 1,
    },
    textContainer: {
        marginLeft: 20,
    },
    title_text: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    type_text1: {
        backgroundColor: '#A0B59C',
        borderRadius: 5,
        fontSize: 10,
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 4,
        textAlign: 'center'
    },
    type_text2: {
        backgroundColor: '#E2DD8D',
        borderRadius: 5,
        fontSize: 11,
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 4,
        textAlign: 'center'
    },
    kebab_image: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    }
});

export default AlbumItem;

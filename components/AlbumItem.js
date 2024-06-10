import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


const AlbumItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image
                    style={styles.folder_image}
                    source={require('../assets/icon/folder.png')}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title_text}>{props.title}</Text>
                    {
                        String(props.type) === "개인앨범" ?  
                        <Text style={styles.type_text1}>{props.type}</Text> :
                        <Text style={styles.type_text2}>{props.type}</Text>
                    }
                    
                </View>
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
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        marginVertical: 7,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    folder_image: {
        width: 68,
        height: 68,
        resizeMode: 'contain',
    },
    textContainer: {
        marginLeft: 20,
    },
    title_text: {
        fontSize: 15.5,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    type_text1: {
        backgroundColor: '#A0B59C',
        borderRadius: 5,
        fontSize: 12,
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 4,
        textAlign: 'center'
    },
    type_text2: {
        backgroundColor: '#E2DD8D',
        borderRadius: 5,
        fontSize: 12,
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 4,
        textAlign: 'center'
    },
    kebab_image: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    }
});

export default AlbumItem;

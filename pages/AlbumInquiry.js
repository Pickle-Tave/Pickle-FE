import "react-native-gesture-handler";

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import AlbumAccess from "../components/AlbumAccess";

const AlbumInquiry = ({ route }) => {
  const { id } = route.params;
  const [check, setCheck] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.search_section}>
        <TextInput style={styles.textinput} placeholder='#해시태그' />
        <TouchableOpacity >
          <Image
            style={styles.search_bar}
            source={require('../assets/icon/search.png')}
          />
        </TouchableOpacity>
      </View>
      <AlbumAccess check={check} setCheck={setCheck}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  search_section: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '91%',
    marginTop: 20,
    height: 38,
  },
  textinput: {
    width: '85%',
    marginHorizontal: 4,
    fontSize: 12,
  },
  search_bar: {
    width: 20,
    height: 20,
  },
});

export default AlbumInquiry;
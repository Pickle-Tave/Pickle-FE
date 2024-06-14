import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';

const AlbumInquiry = ({route}) => {
  const {id} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.search_section}>
        <TextInput style={styles.textinput} placeholder="#해시태그" />
        <TouchableOpacity>
          <Image
            style={styles.search_bar}
            source={require('../assets/icon/search.png')}
          />
        </TouchableOpacity>
      </View>
      <Text>`{id}번 앨범 조회`</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  search_section: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
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

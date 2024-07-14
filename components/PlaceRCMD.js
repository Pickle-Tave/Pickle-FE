import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';

const PlaceRCMD = () => {
  return (
    <View style={styles.placeRCMDContainer}>
      <Text style={styles.rcmdText}>오늘의 장소 추천</Text>
      <ScrollView horizontal={true}>
        <View style={styles.placeItem}>
          <Image
            style={styles.place_img}
            source={require('../assets/icon/place_rcmd.png')}
          />
          <Text style={styles.place_text}>롯데월드</Text>
        </View>
        <View style={styles.placeItem}>
          <Image
            style={styles.place_img}
            source={require('../assets/icon/place_rcmd1.png')}
          />
          <Text style={styles.place_text}>북촌한옥마을</Text>
        </View>
        <View style={styles.placeItem}>
          <Image
            style={styles.place_img}
            source={require('../assets/icon/place_rcmd2.png')}
          />
          <Text style={styles.place_text}>잠실석촌호수</Text>
        </View>
        <View style={styles.placeItem}>
          <Image
            style={styles.place_img}
            source={require('../assets/icon/place_rcmd3.png')}
          />
          <Text style={styles.place_text}>더현대서울</Text>
        </View>
        <View style={styles.placeItem}>
          <Image
            style={styles.place_img}
            source={require('../assets/icon/place_rcmd4.png')}
          />
          <Text style={styles.place_text}>건대입구</Text>
        </View>
        <View style={styles.placeItem}>
          <Image
            style={styles.place_img}
            source={require('../assets/icon/place_rcmd5.png')}
          />
          <Text style={styles.place_text}>해방촌</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  placeRCMDContainer: {
    marginHorizontal: 20,
    marginVertical: 12,
  },
  rcmdText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  place_text: {
    textAlign: 'center',
    fontSize: 13,
  },
  place_img: {
    height: 165,
    width: 195,
    resizeMode: 'contain',
  },
  placeItem: {
    marginRight: 10,
  },
});

export default PlaceRCMD;

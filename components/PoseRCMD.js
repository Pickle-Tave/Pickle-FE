import 'react-native-gesture-handler';
import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView
} from 'react-native';

const PoseRCMD = () => {
    return (
        <View style={styles.poseRCMDContainer}>
            <Text style={styles.rcmdText}>
                오늘의 포즈 추천
            </Text>
            <ScrollView horizontal={true}>
                <View style={styles.poseItem}>
                    <Image style={styles.pose_img} source={require('../assets/icon/pose_rcmd.png')} />
                    <Text style={styles.pose_text}>모래하트샷</Text>
                </View>
                <View style={styles.poseItem}>
                    <Image style={styles.pose_img} source={require('../assets/icon/pose_rcmd1.png')} />
                    <Text style={styles.pose_text}>볼하트</Text>
                </View>
                <View style={styles.poseItem}>
                    <Image style={styles.pose_img} source={require('../assets/icon/pose_rcmd2.png')} />
                    <Text style={styles.pose_text}>고양이하트</Text>
                </View>
                <View style={styles.poseItem}>
                    <Image style={styles.pose_img} source={require('../assets/icon/pose_rcmd3.png')} />
                    <Text style={styles.pose_text}>꽃받침</Text>
                </View>
                <View style={styles.poseItem}>
                    <Image style={styles.pose_img} source={require('../assets/icon/pose_rcmd4.png')} />
                    <Text style={styles.pose_text}>고양이귀</Text>
                </View>
                <View style={styles.poseItem}>
                    <Image style={styles.pose_img} source={require('../assets/icon/pose_rcmd5.png')} />
                    <Text style={styles.pose_text}>호랑이손</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    poseRCMDContainer: {
      marginHorizontal: 20,
    },
    rcmdText: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'black',
  
    },
    pose_text: {
      textAlign: 'center',
      fontSize: 13,
    },
    pose_img: {
      height: 120,
      width: 129,
      resizeMode: 'contain'
    },
    poseItem: {
      marginRight: 10,
    },
  });

export default PoseRCMD;
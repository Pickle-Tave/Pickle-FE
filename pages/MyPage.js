import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import HashtagMake from '../components/Modal/HashtagMake';
import HashtagList from '../components/Modal/HashtagList';
import { logoutKakao } from '../api/logoutKakao';
import { withdrawKakao } from '../api/withdrawKakao';
import { GetProfile } from '../api/GetProfile';

const MyPage = ({ navigation, handleLogoutSuccess }) => {
  const [MakeHashVisible, setMakeHashVisible] = useState(false);
  const [HashListVisible, setHashListVisible] = useState(false);
  const [profile, setProfile] = useState({
    nickname: null,
    oauthInfo: {
      oauthId: null,
      profile: null,
    },
    role: null,
    status: null
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await GetProfile();
        setProfile(profileData.data);
      } catch (error) {
        console.error('회원 정보 조회 에러:', error);
        Alert.alert('회원 정보 조회 실패', '서버와 통신하는 중 오류가 발생했습니다.');
      }
    };

    fetchProfile();
  }, []);
  console.log(profile);
 

  const handleLogout = async () => {
    try {
      await logoutKakao();
      handleLogoutSuccess();
      navigation.navigate('Onboarding_1');
    } catch (error) {
      Alert.alert(
        '로그아웃 실패',
        error.message || '서버와 통신하는 중 오류가 발생했습니다.',
      );
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawKakao();
      handleLogoutSuccess();
      navigation.navigate('Onboarding_1');
    } catch (error) {
      Alert.alert(
        '회원 탈퇴 실패',
        error.message || '서버와 통신하는 중 오류가 발생했습니다.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <HashtagMake
        visible={MakeHashVisible}
        onClose={() => setMakeHashVisible(false)}
      />
      <HashtagList
        visible={HashListVisible}
        onClose={() => setHashListVisible(false)}
      />
      <View style={styles.upper_section}>
        <View style={styles.profile_section}>
          <Image
            style={styles.user_profile}
            source={
              profile.oauthInfo && profile.oauthInfo.profile
                ? { uri: profile.oauthInfo.profile }
                : require('.././assets/icon/user_profile.png')
            }
          />
          <View style={styles.name_profile}>
            <Text style={styles.text1}>{profile && profile.nickname ? profile.nickname : 'Guest'}</Text>
            <Text style={styles.text2}>{profile && profile.role ? profile.role : 'Guest'}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setMakeHashVisible(true)}>
          <Text style={styles.hashtag_btn}>#해시태그 만들기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middle_section}>
        <TouchableOpacity
          style={styles.hashtag}
          onPress={() => setHashListVisible(true)}>
          <Image
            style={{ width: 40, height: 40, marginLeft: 16 }}
            source={require('../assets/icon/hashtag.png')}
          />
          <Text style={styles.text3}>해시태그 목록</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <Image
            style={{ width: 40, height: 40, marginLeft: 16 }}
            source={require('../assets/icon/setting.png')}
          />
          <Text style={styles.text3}>환경설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gonggi}>
          <Image
            style={{ width: 30, height: 30, marginLeft: 20 }}
            source={require('../assets/icon/gonggi.png')}
          />
          <Text style={styles.text3}>공지사항</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lower_section}>
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Image
            style={{ width: 38, height: 38, marginLeft: 16 }}
            source={require('../assets/icon/logout.png')}
          />
          <Text style={styles.text3}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.member_out} onPress={handleWithdraw}>
          <Image
            style={{ width: 40, height: 40, marginLeft: 16 }}
            source={require('../assets/icon/member_out.png')}
          />
          <Text style={styles.text3}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    justifyContent: 'flex-start',
    width: '90%', 
  },
  user_profile: {
    height: 80,
    width: 80,
    marginLeft: 30, 
    borderRadius: 40,
  },
  name_profile: {
    justifyContent: 'center',
    marginLeft: 20,
    gap: 5,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 15,
  },
  buttonContainer: {
    width: '100%', 
    alignItems: 'center',
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
    alignItems: 'center', 
  },
  setting: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 7,
    height: 65,
    alignItems: 'center',
  },
  gonggi: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 7,
    height: 65,
    alignItems: 'center', 
  },
  text3: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 13,
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
    alignItems: 'center',
  },
  member_out: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    height: 55,
    alignItems: 'center',
  },
});

export default MyPage;

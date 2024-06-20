import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home';
import Album from './pages/Album';
import Filter from './pages/filter/Filter';
import MyPage from './pages/MyPage';
import Onboarding_1 from './pages/onboarding/onboarding_1';
import Onboarding_2 from './pages/onboarding/onboarding_2';
import Onboarding_3 from './pages/onboarding/onboarding_3';
import Onboarding_4 from './pages/onboarding/onboarding_4';
import Onboarding_5 from './pages/onboarding/onboarding_5';
import AlbumInquiry from './pages/AlbumInquiry';
import Filter1 from './pages/filter/Filter1';
import Filter2 from './pages/filter/Filter2';
import Filter3 from './pages/filter/Filter3';
import Filter4 from './pages/filter/Filter4';
import Filter5 from './pages/filter/Filter5';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomHeader = ({ navigation, title, canGoBack }) => {
    const [alram, setAlram] = useState(false);

    return (
        <View style={styles.headerContainer}>
            {canGoBack && (
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    style={styles.headerLeft}>
                    <Image
                        style={styles.headerLeftImage}
                        source={require('./assets/icon/back.png')} // 뒤로가기 버튼
                    />
                </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.headerRight}>
                <TouchableOpacity
                    onPress={() => alram ? setAlram(false) : setAlram(true)}>
                    <Image
                        style={styles.headerAlramImage}
                        source={
                            alram
                                ? require('./assets/icon/alram_on.png')
                                : require('./assets/icon/alram_off.png')
                        } // 버튼 아이콘 이미지 경로로 변경
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
                    <Image
                        style={styles.headerMyPageImage}
                        source={require('./assets/icon/mypage.png')} // 버튼 아이콘 이미지 경로로 변경
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

};

const MainScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#4C5A49',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                tabBarStyle: {
                    height: 75,
                    backgroundColor: '#FFFFFF',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderColor: '#4C5A49',
                    borderWidth: 5,
                    position: 'absolute', // 둥근 모서리를 위해 탭바를 고정 위치로 설정
                },
                tabBarItemStyle: {
                    flex: 1,
                },
                tabBarHideOnKeyboard: true,
            }}>
            <Tab.Screen
                name="Filter"
                component={Filter}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? require('./assets/icon/active_filter.png')
                                    : require('./assets/icon/inactive_filter.png')
                            }
                            style={styles.tabBarIcon}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? require('./assets/icon/active_home.png')
                                    : require('./assets/icon/inactive_home.png')
                            }
                            style={styles.tabBarIcon}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Album"
                component={Album}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? require('./assets/icon/active_album.png')
                                    : require('./assets/icon/inactive_album.png')
                            }
                            style={styles.tabBarIcon}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

function App() {

  const [isLogged, setIsLogged] = useState(false);


    return isLogged ? (
        //로그인이 된 상태: Home화면
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={({ navigation }) => ({
                        header: () => (
                            <CustomHeader navigation={navigation} title="Pickle" />
                        ),
                    })}
                />
                <Stack.Screen
                    name="MyPage"
                    component={MyPage}
                    options={({ navigation }) => ({
                        header: () => (
                            <CustomHeader
                                navigation={navigation}
                                title="MyPage"
                                canGoBack={true}
                            />
                        ),
                        headerBackVisible: true,
                    })}
                />
                <Stack.Screen
                    name="AlbumInquiry"
                    component={AlbumInquiry}
                    options={({ navigation }) => ({
                        header: () => (
                            <CustomHeader
                                navigation={navigation}
                                title="앨범조회"
                                canGoBack={true}
                            />
                        ),
                        headerBackVisible: true,
                    })}
                />
                <Stack.Screen
                    name="Filter1"
                    component={Filter1}
                    options={({ navigation }) => ({
                        header: () => (
                            <CustomHeader navigation={navigation} title="옵션 설정" />
                        ),
                        headerBackVisible: true,
                    })}
                />
                <Stack.Screen
                    name="Filter2"
                    component={Filter2}
                    options={({ navigation }) => ({
                        header: () => (
                            <CustomHeader navigation={navigation} title="로딩 중" />
                        ),
                        headerBackVisible: true,
                    })}
                />
                <Stack.Screen
                    name="Filter3"
                    component={Filter3}
                    options={({ navigation }) => ({
                        header: () => (
                            <CustomHeader navigation={navigation} title="사진 선택" />
                        ),
                        headerBackVisible: true,
                    })}
                />
                <Stack.Screen
                    name="Filter4"
                    component={Filter4}
                    options={({ navigation }) => ({
                        header: () => (
                            <CustomHeader navigation={navigation} title="해시태그 설정" />
                        ),
                        headerBackVisible: true,
                    })}
                />
                <Stack.Screen
                    name="Filter5"
                    component={Filter5}
                    options={({ navigation }) => ({
                        header: () => (
                            <CustomHeader navigation={navigation} title="앨범에 추가" />
                        ),
                        headerBackVisible: true,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    ) : (
        //로그인이 안된 상태: 온보딩 화면
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding_1">
                <Stack.Screen
                    name="Onboarding_1"
                    component={Onboarding_1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding_2"
                    component={Onboarding_2}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding_3"
                    component={Onboarding_3}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding_4"
                    component={Onboarding_4}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding_5"
                    component={Onboarding_5}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

    headerContainer: {
        backgroundColor: '#4C5A49',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative'
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    headerLeft: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
        zIndex: 1
    },
    headerLeftImage: {
        width: 10, // 이미지 너비 조정
        height: 20, // 이미지 높이 조정
        marginLeft: 10,
    },
    headerRight: {
        flexDirection: 'row', // 수평 정렬
        position: 'absolute',
        right: 10,
        marginRight: 10,
    },
    headerMyPageImage: {
        width: 26,
        height: 26,
        marginLeft: 5, // 이미지 간격 조정
        marginRight: 7,
    },
    headerAlramImage: {
        width: 24,
        height: 26,
        marginLeft: 5, // 이미지 간격 조정
        marginRight: 10,
    },
    tabBarIcon: {
        width: 22,
        height: 26,
        marginTop: 5,
    },

});

export default App;
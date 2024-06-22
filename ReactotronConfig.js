import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage) // Replaces React Native's AsyncStorage with the one from @react-native-async-storage/async-storage
  .configure({name: 'React Native Demo'}) // 콘솔에 표시될 이름을 설정합니다.
  .useReactNative() // React Native 플러그인을 사용합니다.
  .use(reactotronRedux()) // Redux 플러그인을 사용합니다.
  .connect(); // 연결합니다.

console.tron = Reactotron;

export default Reactotron;

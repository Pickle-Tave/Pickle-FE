/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import ReduxApp from './ReduxApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => ReduxApp);
console.disableYellowBox = true; // 경고를 비활성화합니다.

/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import ReduxApp from './ReduxApp.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;

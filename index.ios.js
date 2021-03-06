'use strict';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';
import MyNotificationsScreen from './components/notifications.js';
import CamScreen from './components/camscreen.js';
import TestShare from './components/share.js';

console.disableYellowBox = true;


  const watdog = TabNavigator({
    Cam: { screen: CamScreen },
  }, {
    headerMode: 'screen',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'transparent',
      },
      indicatorStyle: 'transparent'
    },
    swipeEnabled: true
  }
);

AppRegistry.registerComponent('watdog', () => watdog);

{/*   <Button
  onPress={() => navigate('Cam')}
  title="Take a picture"
  />
  <Button
  onPress={() => navigate('Notifications')}
  title="Go to notifications"
  />  */}

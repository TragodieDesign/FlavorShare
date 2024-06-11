// HomeTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import FirstScreen from './Screens/FirstScreen'; // Adicione outras telas conforme necessário

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="FirstScreen" component={FirstScreen} />
      {/* Adicione mais abas conforme necessário */}
    </Tab.Navigator>
  );
};

export default HomeTabs;

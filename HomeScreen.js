import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstScreen from './Screens/FirstScreen';
import SecondScreen from './Screens/SecondScreen';


const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
 <FirstScreen/>
  );
};

export default HomeScreen;

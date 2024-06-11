import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstScreen from './Screens/FirstScreen';
import SecondScreen from './Screens/SecondScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Início" component={FirstScreen} />
      <Tab.Screen name="Busca" component={SecondScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

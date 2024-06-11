import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { initializeApp} from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import InitialScreen from './InitialScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import FirstScreen from './Screens/FirstScreen'; // Adicione outras telas conforme necessário
import HomeTabs from './HomeTabs';
// Configurar Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2LbXcky6tycsr135oNlCZWIeN_YK3I6g",
  authDomain: "auth-flavorshare.firebaseapp.com",
  databaseURL: "https://auth-flavorshare-default-rtdb.firebaseio.com",
  projectId: "auth-flavorshare",
  storageBucket: "auth-flavorshare.appspot.com",
  messagingSenderId: "350883304437",
  appId: "1:350883304437:web:3732d59936eb7091df06bc",
  measurementId: "G-M10LV4FLYJ"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// Criar navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

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
import FirstScreen from './Screens/FirstScreen'; 
import SingleRecipe from './Recipes/SingleRecipe';
import HomeTabs from './HomeTabs';
import CheckoutScreen from './CheckoutScreen'
import { StripeProvider } from '@stripe/stripe-react-native';
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
    <StripeProvider publishableKey="pk_live_51PQiq7Lf9UR9gU51zvQ3lNcSzncjtpEKgsB1vQpmgl2cv7uiNElngkRSIO9bBrQ5WY4qNsKAvkqCl5KnRLJtlWRh008ETCN3kA">
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="Cadastro" component={RegisterScreen}  />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SingleRecipe" component={SingleRecipe} options={{ headerShown: false }}/>
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </StripeProvider>
  );
};

export default App;

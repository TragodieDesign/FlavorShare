import { getAnalytics } from "firebase/analytics";
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import InitialScreen from './InitialScreen'
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';

import {initializeApp} from 'firebase/app';


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

const analytics = getAnalytics(app);


// Criar pilha de navegação
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen name="InitialScreen" component={InitialScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
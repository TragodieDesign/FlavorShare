import React from 'react';
import { StyleSheet, View, Text, Button,Image } from 'react-native';
import RegisterScreen from './RegisterScreen';


const InitialScreen = ({ navigation }) => {
  return (
    <View
    style={[
      styles.container,
      {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
      },
    ]}>
           <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./assets/flavor-share.png')}
            style={{width: 200, height: 200}}/>
           </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{textAlign:'center',fontSize:30,fontWeight:'800',}} >Bem vindo(a) ao FlavorShare! </Text>
      <Text>Para iniciar faça login ou cadastre-se</Text>

    </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap:20, }}>

    <Button color="#6b0812" title="Login" onPress={() => navigation.navigate('Login')} />
      <Button color="#6b0812" title="Cadastre-se" onPress={() => navigation.navigate('RegisterScreen')}  />
    </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 60,
      
    },

  });

export default InitialScreen;

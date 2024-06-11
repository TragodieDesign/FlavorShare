import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const FirstScreen = () => {

    const [uid, setUid] = useState(null);

    useEffect(() => {
      // Função para obter o UID do AsyncStorage
      const getUidFromStorage = async () => {
        try {
          const storedUid = await AsyncStorage.getItem('authUid');
          setUid(storedUid); // Define o UID recuperado no estado
        } catch (error) {
          console.error('Erro ao obter o UID do AsyncStorage:', error);
        }
      };
    
      getUidFromStorage(); // Chama a função de obtenção do UID do AsyncStorage
    }, []);
    
    // Exibe o UID na tela
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{uid ? `UID do usuário: ` : 'Carregando UID...'}</Text>
      </View>
    );
  
};

export default FirstScreen;

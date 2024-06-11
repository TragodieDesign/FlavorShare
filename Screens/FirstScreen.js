import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const FirstScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Limpa o listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <View>
          <Text>E-mail: {user.email}</Text>
          <Button title="Sair" />
        </View>
      ) : (
        <Text>Nenhum usuário autenticado</Text>
      )}
    </View>
  );
};

export default FirstScreen;

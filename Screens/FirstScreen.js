import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import RecipesList from '../Recipes/RecipesList';
import SingleRecipe from '../Recipes/SingleRecipe';
const FirstScreen = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', currentUser.email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        } else {
          console.log('No such document!');
        }
      }
    });

    // Limpa o listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('User signed out!');
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });
  };

  return (
    <View style={styles.container}>
      
      <RecipesList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch', 
    paddingTop: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default FirstScreen;

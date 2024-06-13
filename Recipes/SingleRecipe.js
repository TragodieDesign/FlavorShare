import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';

const SingleRecipe = ({ route, navigation }) => {
  const { recipe } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: recipe.link_imagem }} style={styles.image} />
      <Text style={styles.title}>{recipe.receita}</Text>
      <Text style={styles.details}>{recipe.categoria}</Text>
      <Text style={styles.details}>Dificuldade: {recipe.dificuldade}</Text>
      <Text style={styles.details}>Ingredientes: {recipe.ingredientes}</Text>
      <Text style={styles.details}>Modo de Preparo: {recipe.modoPreparo}</Text>
      <Button color="#6b0812"
        title="Adicionar ao Carrinho"
        onPress={() => navigation.navigate('CheckoutScreen', { recipe })}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SingleRecipe;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://flavorbackend.onrender.com/recipe/getRecipe')
      .then(response => {
        if (response.data) {
          setRecipes(Object.values(response.data));
        } else {
          setError('Não foram encontradas receitas.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load recipes.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>;
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.receita}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('SingleRecipe', { recipe: item })}
        >
          <Image source={{ uri: item.link_imagem }} style={styles.thumbnail} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.receita}</Text>
            <Text style={styles.details}>Categoria: {item.categoria}</Text>
            <Text style={styles.details}>Dificuldade: {item.dificuldade}</Text>
          </View>
        </TouchableOpacity>
      )}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  thumbnail: {
    width: (width / 2) - 40,
    height: (width / 2) - 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default RecipesList;

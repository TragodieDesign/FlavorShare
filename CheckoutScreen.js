import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const CheckoutScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const [isPaymentSheetReady, setIsPaymentSheetReady] = useState(false);

  const fetchPaymentSheetParams = async () => {
    // Convertendo o valor da receita para centavos
    const amount = parseFloat(recipe.custo.replace('R$', '').replace(',', '.')) * 100;

    const response = await fetch('https://flavorbackend.onrender.com/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount }) // valor em centavos
    });
    const { clientSecret } = await response.json();
    return {
      paymentIntent: clientSecret,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Flavor Share',
      currency: 'brl',
    });

    if (!error) {
      setIsPaymentSheetReady(true);
    } else {
      Alert.alert(`Erro ao inicializar o PaymentSheet: ${error.message}`);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  const fetchUserAddress = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setAddress(userDoc.data().address);
      } else {
        Alert.alert('Erro', 'Endereço do usuário não encontrado.');
      }
    }

    setIsLoadingAddress(false);
  };

  useEffect(() => {
    fetchUserAddress();
    initializePaymentSheet();
  }, []);

  if (isLoadingAddress) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>
      <Text style={styles.details}>Nome da Receita: {recipe.receita}</Text>
      <Text style={styles.details}>Valor: {recipe.custo}</Text>

      {address ? (
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Endereço de Entrega:</Text>
          <Text style={styles.addressText}>{address.logradouro}, {address.numero}</Text>
          <Text style={styles.addressText}>{address.CEP}</Text>
          <Text style={styles.addressText}>{address.cidade}, {address.estado}</Text>
        </View>
      ) : (
        <Text style={styles.details}>Endereço não encontrado.</Text>
      )}

      <Button
      color="#6b0812"
        title="Checkout"
        disabled={!isPaymentSheetReady}
        onPress={openPaymentSheet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  addressContainer: {
    marginVertical: 20,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CheckoutScreen;

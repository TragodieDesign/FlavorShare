import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [CEP, setCEP] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name || !logradouro || !numero || !CEP || !cidade || !estado) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    try {
      const response = await axios.post('https://flavorbackend.onrender.com/users/register', {
        email,
        password,
        name,
        logradouro,
        numero,
        CEP,
        cidade,
        estado,
      });
      
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Usuário registrado com sucesso');
        navigation.navigate('Login'); // Navega para a tela de login após o registro bem-sucedido
      } else {
        Alert.alert('Erro', 'Erro ao registrar usuário');
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Alert.alert('Erro', 'Erro ao registrar usuário');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.title}>
            <Text>Cadastre-se</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Logradouro"
            value={logradouro}
            onChangeText={setLogradouro}
          />
          <TextInput
            style={styles.input}
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={CEP}
            onChangeText={setCEP}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={cidade}
            onChangeText={setCidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={estado}
            onChangeText={setEstado}
          />
          <Button color="#6b0812" title="Registrar" onPress={handleRegister} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;

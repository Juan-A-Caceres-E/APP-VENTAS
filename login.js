import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      navigation.navigate('MenuDrawer'); // Navega a MenuDrawer
    } else {
      Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <AntDesign name="user" size={100} color="black" style={styles.lockIcon} />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: windowWidth * 0.8,
    height: 40,
    fontSize: 16,
    padding: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  lockIcon: {
    marginBottom: 20,
  },
});

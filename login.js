import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importar el icono de persona de AntDesign

const windowWidth = Dimensions.get('window').width;

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      navigation.navigate('Menu');
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
    width: windowWidth * 0.8, // Ancho del cuadro de texto
    height: 40, // Altura del cuadro de texto
    fontSize: 16, // Tamaño de la fuente
    padding: 8, // Relleno interno
    marginBottom: 20, // Margen inferior
    borderWidth: 1, // Ancho del borde
    borderColor: '#ccc', // Color del borde
    borderRadius: 5, // Radio de los bordes
  },
  lockIcon: {
    marginBottom: 20, // Espacio adicional debajo del icono
  },
});

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function PaymentMethod() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Método de Pago</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

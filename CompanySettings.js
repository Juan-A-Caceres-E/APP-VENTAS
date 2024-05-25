import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function CompanySettings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Configuración de Empresa</Text>
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

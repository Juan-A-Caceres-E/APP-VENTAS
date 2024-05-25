import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Products() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Productos</Text>
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

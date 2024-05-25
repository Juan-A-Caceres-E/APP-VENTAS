import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Sell() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Vender</Text>
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

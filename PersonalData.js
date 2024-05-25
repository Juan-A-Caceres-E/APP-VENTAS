import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function PersonalData() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Datos Personales</Text>
      {/* Aquí puedes añadir más campos de datos personales */}
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

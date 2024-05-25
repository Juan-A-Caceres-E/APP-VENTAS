import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function Menu({ navigation }) {
  const handleSellPress = () => {
    navigation.navigate('Sell');
  };

  const handleProductsPress = () => {
    navigation.navigate('Products');
  };

  const handlePaymentMethodPress = () => {
    navigation.navigate('PaymentMethod');
  };

  const handleCompanySettingsPress = () => {
    navigation.navigate('CompanySettings');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={handleSellPress}>
        <FontAwesome5 name="store" size={40} color="#FFFFFF" />
        <Text style={styles.buttonText}>Vender</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#FFC107' }]} onPress={handleProductsPress}>
        <FontAwesome5 name="box-open" size={40} color="#FFFFFF" />
        <Text style={styles.buttonText}>Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={handlePaymentMethodPress}>
        <FontAwesome5 name="money-check-alt" size={40} color="#FFFFFF" />
        <Text style={styles.buttonText}>Método de Pago</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#9C27B0' }]} onPress={handleCompanySettingsPress}>
        <FontAwesome5 name="cogs" size={40} color="#FFFFFF" />
        <Text style={styles.buttonText}>Configuración Empresa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
    width: windowWidth * 0.8,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#FFFFFF',
  },
});

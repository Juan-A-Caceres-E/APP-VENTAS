import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
import Menu from './Menu';
import Sell from './Sell';
import Products from './Products';
import PaymentMethod from './PaymentMethod';
import CompanySettings from './CompanySettings';
import PersonalData from './PersonalData';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    navigation.replace('Login'); // Navegar a la pantalla de login y cerrar sesión
  };

  return (
    <View style={styles.drawerContainer}>
      <Button title="Volver al Menú Principal" onPress={() => navigation.navigate('Menu')} />
      <Button title="Modo Oscuro" onPress={handleDarkModeToggle} />
      <Button title="Datos Personales" onPress={() => navigation.navigate('PersonalData')} />
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}

function MenuDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Menu" component={Menu} />
      <Drawer.Screen name="Sell" component={Sell} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="PaymentMethod" component={PaymentMethod} />
      <Drawer.Screen name="CompanySettings" component={CompanySettings} />
      <Drawer.Screen name="PersonalData" component={PersonalData} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MenuDrawer" component={MenuDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

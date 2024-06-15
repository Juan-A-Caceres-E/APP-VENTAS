import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
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

const windowWidth = Dimensions.get('window').width;
const buttonWidth = windowWidth * 0.6 ; // Ajuste del ancho de los botones basado en el ancho de la ventana

function CustomDrawerContent({ navigation, isDarkMode, toggleDarkMode }) {
  const handleLogout = () => {
    navigation.replace('Login'); // Navegar a la pantalla de login y cerrar sesión
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.buttonContainer}>
        <Button title="Volver al Menú Principal" onPress={() => navigation.navigate('Menu')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Modo Oscuro" onPress={toggleDarkMode} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Datos Personales" onPress={() => navigation.navigate('PersonalData')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cerrar Sesión" onPress={handleLogout} />
      </View>
    </View>
  );
}

function MenuDrawer({ isDarkMode, toggleDarkMode }) {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
      <Drawer.Screen name="Menu" options={{ headerShown: true }}>
        {props => <Menu {...props} isDarkMode={isDarkMode} />}
      </Drawer.Screen>
      <Drawer.Screen name="Sell" options={{ headerShown: true }}>
        {props => <Sell {...props} isDarkMode={isDarkMode} />}
      </Drawer.Screen>
      <Drawer.Screen name="Products" options={{ headerShown: true }}>
        {props => <Products {...props} isDarkMode={isDarkMode} />}
      </Drawer.Screen>
      <Drawer.Screen name="PaymentMethod" options={{ headerShown: true }}>
        {props => <PaymentMethod {...props} isDarkMode={isDarkMode} />}
      </Drawer.Screen>
      <Drawer.Screen name="CompanySettings" options={{ headerShown: true }}>
        {props => <CompanySettings {...props} isDarkMode={isDarkMode} />}
      </Drawer.Screen>
      <Drawer.Screen name="PersonalData" options={{ headerShown: true }}>
        {props => <PersonalData {...props} isDarkMode={isDarkMode} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MenuDrawer" options={{ headerShown: false }}>
          {props => <MenuDrawer {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  buttonContainer: {
    marginVertical: 10, // Espacio vertical constante entre los botones
    width: buttonWidth,
    height: 50, // Ajuste de la altura de los botones
    justifyContent: 'center',
  },
});

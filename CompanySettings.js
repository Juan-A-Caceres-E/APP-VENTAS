import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function CompanySettings({ isDarkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'Mi Empresa S.A.',
    ownerName: 'Juan Pérez',
    address: 'Calle Falsa 123',
    ruc: '1234567890',
    phone: '123-456-7890',
    email: 'empresa@correo.com',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí podrías guardar la información en algún lugar si fuera necesario
  };

  const handleChange = (name, value) => {
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Pantalla de Configuración de Empresa</Text>
      <View style={styles.inputContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Nombre de Empresa:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.readOnly, isDarkMode ? styles.darkInput : styles.lightInput]}
          editable={isEditing}
          value={companyInfo.companyName}
          onChangeText={(text) => handleChange('companyName', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Nombre Dueño:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.readOnly, isDarkMode ? styles.darkInput : styles.lightInput]}
          editable={isEditing}
          value={companyInfo.ownerName}
          onChangeText={(text) => handleChange('ownerName', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Dirección:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.readOnly, isDarkMode ? styles.darkInput : styles.lightInput]}
          editable={isEditing}
          value={companyInfo.address}
          onChangeText={(text) => handleChange('address', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>RUC:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.readOnly, isDarkMode ? styles.darkInput : styles.lightInput]}
          editable={isEditing}
          value={companyInfo.ruc}
          onChangeText={(text) => handleChange('ruc', text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Teléfono:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.readOnly, isDarkMode ? styles.darkInput : styles.lightInput]}
          editable={isEditing}
          value={companyInfo.phone}
          onChangeText={(text) => handleChange('phone', text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Email:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.readOnly, isDarkMode ? styles.darkInput : styles.lightInput]}
          editable={isEditing}
          value={companyInfo.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>
      {isEditing ? (
        <Button title="Guardar" onPress={handleSave} />
      ) : (
        <Button title="Editar" onPress={handleEdit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  editable: {
    backgroundColor: '#fff',
  },
  readOnly: {
    backgroundColor: '#d3d3d3',
  },
  lightInput: {
    color: '#000',
  },
  darkInput: {
    color: '#fff',
  },
});

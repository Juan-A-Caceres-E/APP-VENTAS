import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [phone, setPhone] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [methodData, setMethodData] = useState({
    YAPE: { phone: '123456789', qrImage: require('./assets/yape-qr.png') },
    PLIN: { phone: '987654321', qrImage: require('./assets/plin-qr.png') },
  });

  const selectMethod = (method) => {
    setSelectedMethod(method);
    setPhone(methodData[method].phone);
    setQrImage(methodData[method].qrImage);
  };

  // Función para abrir el selector de imágenes
  const pickImage = async () => {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    // Abrir la galería para seleccionar una imagen
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setQrImage({ uri: result.assets[0].uri });
    }
  };

  const saveChanges = () => {
    if (selectedMethod) {
      // Actualizar los datos del método seleccionado
      setMethodData((prevMethodData) => ({
        ...prevMethodData,
        [selectedMethod]: {
          phone,
          qrImage,
        },
      }));
    }
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Método de Pago</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.methodButton, { backgroundColor: '#8E44AD' }]} 
          onPress={() => selectMethod('YAPE')}
        >
          <Text style={styles.methodButtonText}>YAPE</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.methodButton, { backgroundColor: '#3498DB' }]} 
          onPress={() => selectMethod('PLIN')}
        >
          <Text style={styles.methodButtonText}>PLIN</Text>
        </TouchableOpacity>
      </View>

      {selectedMethod && (
        <View style={styles.detailsContainer}>
          <Image source={qrImage} style={styles.qrImage} />
          <Text style={styles.phoneNumber}>{phone}</Text>
        </View>
      )}

      {selectedMethod && (
        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      )}

      <Modal visible={editMode} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar {selectedMethod}</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Número de teléfono"
              value={phone}
              onChangeText={setPhone}
              editable={true}
            />
            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
              <Text style={styles.imagePickerButtonText}>Seleccionar nueva imagen QR</Text>
            </TouchableOpacity>
            <Button title="Guardar" onPress={saveChanges} />
            <Button title="Cancelar" onPress={() => setEditMode(false)} />
          </View>
        </View>
      </Modal>
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
  text: {
    fontSize: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  methodButton: {
    flex: 1,
    margin: 10,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  methodButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrImage: {
    width: 300, // Aumenta el tamaño de la imagen QR
    height: 300,
    marginBottom: 20,
  },
  phoneNumber: {
    fontSize: 30, // Número de teléfono más grande
    fontWeight: 'bold',
    marginBottom: 40,
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 20,
  },
  imagePickerButton: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

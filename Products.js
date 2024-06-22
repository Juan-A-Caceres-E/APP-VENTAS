import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const initialProducts = [
  { name: 'Leche', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: 'Azucar', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: 'Galletas', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: 'Limon', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: 'Harina', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
];

export default function Products() {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editableName, setEditableName] = useState('');
  const [editablePrice, setEditablePrice] = useState('');

  const filteredProducts = query
    ? initialProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : initialProducts;

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setQuery(product.name);
    setEditableName(product.name);
    setEditablePrice(product.defaultPrice);
    setShowProductModal(false);
  };

  const handleSaveChanges = () => {
    if (selectedProduct) {
      selectedProduct.name = editableName;
      selectedProduct.defaultPrice = editablePrice;
      setQuery(editableName);
      setSelectedProduct({ ...selectedProduct });
      setShowProductModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Productos</Text>

      {/* Botón para abrir el modal de búsqueda de productos */}
      <TouchableOpacity onPress={() => setShowProductModal(true)}>
        <View style={styles.input}>
          <Text>{query || 'Buscar producto...'}</Text>
        </View>
      </TouchableOpacity>

      {/* Botón para editar el producto seleccionado */}
      <TouchableOpacity
        style={[styles.editButton, !selectedProduct && styles.disabledButton]}
        onPress={() => selectedProduct && setShowProductModal(true)}
        disabled={!selectedProduct}
      >
        <Text style={styles.buttonText}>
          {selectedProduct ? 'Editar Producto Seleccionado' : 'Selecciona un Producto'}
        </Text>
      </TouchableOpacity>

      {/* Modal para la búsqueda y selección del producto */}
      <Modal visible={showProductModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Seleccionar Producto</Text>

          <Autocomplete
            data={filteredProducts}
            defaultValue={query}
            onChangeText={(text) => setQuery(text)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleProductSelect(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            inputContainerStyle={styles.autocompleteContainer}
            listStyle={styles.autocompleteList}
          />

          <TouchableOpacity style={styles.button} onPress={() => setShowProductModal(false)}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>

          {/* Mostrar campos de edición si hay un producto seleccionado */}
          {selectedProduct && (
            <View style={styles.editContainer}>
              <Text style={styles.editTitle}>Editar Producto</Text>
              
              <TextInput
                style={styles.input}
                value={editableName}
                onChangeText={(text) => setEditableName(text)}
                placeholder="Nombre del Producto"
              />

              <TextInput
                style={styles.input}
                value={editablePrice}
                onChangeText={(text) => setEditablePrice(text)}
                placeholder="Precio del Producto"
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  autocompleteContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '100%',
  },
  autocompleteList: {
    position: 'absolute',
    top: 40,
    width: '100%',
    maxHeight: 200,
    zIndex: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
    padding: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  editContainer: {
    marginTop: 20,
    padding: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  editTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});

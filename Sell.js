import React, { useState, useEffect  } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import RNPickerSelect from 'react-native-picker-select';

const initialProducts = [
  { name: 'Leche', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: 'Azucar', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: 'Galletas', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: 'Limon', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: 'Harina', defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
];

export default function Sell() {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [newItemsCount, setNewItemsCount] = useState(0);

  useEffect(() => {
    filterProducts();
  }, [query]);

  const filterProducts = () => {
    const filteredProd = query
    ? initialProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : initialProducts; // Mostrar todos los productos si no hay consulta
    setFilteredProducts(filteredProd);
  };
    

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setQuery(product.name);
    setPrice(product.defaultPrice);
    setShowProductModal(false); // Cierra el modal después de seleccionar el producto
  };

  const handleAddToCart = () => {
    if (selectedProduct && quantity && unit && price) {
      const newItem = {
        product: selectedProduct.name,
        quantity,
        unit,
        price,
      };
      setCart([...cart, newItem]);
      setNewItemsCount(newItemsCount + 1);
      setQuery('');
      setSelectedProduct(null);
      setQuantity('');
      setUnit('');
      setPrice('');
    }
  };

  const handleOpenCart = () => {
    setShowCart(true);
    setNewItemsCount(0); // Restablecer el recuento de notificaciones cuando se abre el carrito
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Vender</Text>

      {/* Botón para abrir el modal de búsqueda de productos */}
      <TouchableOpacity onPress={() => setShowProductModal(true)}>
        <View style={styles.input}>
          <Text>{query || 'Buscar producto...'}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal para la búsqueda y selección del producto */}
      <Modal visible={showProductModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Seleccionar Producto</Text>

          <Autocomplete
            data={filteredProducts}
            defaultValue={query}
            onChangeText={(text) => setQuery(text)}
            flatListProps={{
              keyExtractor: (_, item) => item,
              renderItem: ({ item }) => (
                <TouchableOpacity onPress={() => handleProductSelect(item)}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              ),
            }}
            inputContainerStyle={styles.autocompleteContainer}
            listStyle={styles.autocompleteList}
          />

          <TouchableOpacity style={styles.button} onPress={() => setShowProductModal(false)}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setUnit(value)}
        placeholder={{ label: 'Selecciona unidad', value: null }}
        items={[
          { label: 'kg', value: 'kg' },
          { label: 'g', value: 'g' },
          { label: 'unidad', value: 'unidad' },
          { label: 'litro', value: 'litro' },
        ]}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Agregar al Carrito</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cartButton} onPress={handleOpenCart}>
        <Text style={styles.cartButtonText}>🛒</Text>
        {newItemsCount > 0 && (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>{newItemsCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal visible={showCart} animationType="slide">
        <View style={styles.cartModal}>
          <Text style={styles.cartTitle}>Carrito</Text>
          <FlatList
            data={cart}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.cartText}>{item.product}</Text>
                <Text style={styles.cartText}>{item.quantity} {item.unit}</Text>
                <Text style={styles.cartText}>${item.price}</Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={() => setShowCart(false)}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
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
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ffa500',
    borderRadius: 30,
    padding: 15,
  },
  cartButtonText: {
    color: 'white',
    fontSize: 24,
  },
  cartModal: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  cartTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',

    color: '#333',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,

    backgroundColor: '#fff',
  },
  cartText: {
    fontSize: 16,
    marginBottom: 5,

    color: '#333',
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

    color: '#333',
    fontWeight: 'bold',
  },
  notification: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
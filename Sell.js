import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import RNPickerSelect from "react-native-picker-select";

const initialProducts = [
  { name: "Leche", defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: "Azucar", defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: "Galletas", defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: "Limon", defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
  { name: "Harina", defaultPrice: (Math.random() * 20 + 10).toFixed(2) },
];

export default function Sell() {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [newItemsCount, setNewItemsCount] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showTotalModal, setShowTotalModal] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    filterProducts();
  }, [query]);

  const filterProducts = () => {
    const filteredProd = query
      ? initialProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      : initialProducts;
    setFilteredProducts(filteredProd);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setQuery(product.name);
    setPrice(product.defaultPrice);
    setShowProductModal(false);
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
      setQuery("");
      setSelectedProduct(null);
      setQuantity("");
      setUnit("");
      setPrice("");
    }
  };

  const handleOpenCart = () => {
    setShowCart(true);
    setNewItemsCount(0);
  };

  const handleConfirmSell = () => {
    const totalAmount = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotal(totalAmount);
    setShowCart(false);
    setShowTotalModal(true);
  };

  const handleSellCart = () => {
    setShowConfirmModal(true);
  };

  const handlePrintReceipt = () => {
    // Aquí puedes agregar la lógica para imprimir la boleta.
    Alert.alert("Boleta de venta", "Imprimiendo boleta de venta...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Vender</Text>

      <TouchableOpacity onPress={() => setShowProductModal(true)}>
        <View style={styles.input}>
          <Text>{query || "Buscar producto..."}</Text>
        </View>
      </TouchableOpacity>

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

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowProductModal(false)}
          >
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
        placeholder={{ label: "Selecciona unidad", value: null }}
        items={[
          { label: "kg", value: "kg" },
          { label: "g", value: "g" },
          { label: "unidad", value: "unidad" },
          { label: "litro", value: "litro" },
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
                <Text style={styles.cartText}>
                  {item.quantity} {item.unit}
                </Text>
                <Text style={styles.cartText}>${item.price}</Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={handleSellCart}>
            <Text style={styles.buttonText}>Vender</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowCart(false)}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={showConfirmModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Confirmación de Venta</Text>
          <Text>¿Está seguro de que desea realizar la venta?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowConfirmModal(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleConfirmSell}
            >
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showTotalModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Mi Empresa S.A.</Text>
          <Text style={styles.modalSubTitle}>Telf: 123-456-7890</Text>
          <Text style={styles.modalSubTitle}>Direc: Calle Falsa 123</Text>
          <Text style={styles.modalSubTitle}>Fecha de emisión: 06/07/2024</Text>
          <Text style={styles.modalHeader}>BOLETA DE VENTA</Text>
          <Text style={styles.totalText}>Total a Pagar: ${total.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePrintReceipt}
          >
            <Text style={styles.buttonText}>Imprimir Boleta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowTotalModal(false)}
          >
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
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  autocompleteContainer: {
    borderWidth: 0,
  },
  autocompleteList: {
    borderWidth: 0,
  },
  itemText: {
    padding: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  cartButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 50,
  },
  cartButtonText: {
    color: "white",
    fontSize: 24,
  },
  notification: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 12,
  },
  cartModal: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  cartTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  cartText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: "center",
  },
  modalSubTitle: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  totalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  inputAndroid: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
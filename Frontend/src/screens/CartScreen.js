import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ route }) => {
  const [cart, setCart] = useState([]);
  const { product } = route.params;

  useEffect(() => {
    const addAndFetchCart = async () => {
      await handleAddToCart(product);
      await fetchCart();
    };
    addAndFetchCart();  // Combining add and fetch logic to avoid overwriting the state
  }, []);

  const handleAddToCart = async (product) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios.post(
        'https://codemancers-nodejs-2.onrender.com/api/cart/add',
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const fetchCart = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        'https://codemancers-nodejs-2.onrender.com/api/cart',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.products);  // Assuming `response.data.products` holds the cart items
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleCheckout = async () => {
    const token = await AsyncStorage.getItem('token');
    try {

      if(cart.length === 0) {
        alert('Cart is empty');
        return;
      }

      await axios.post(
        'https://codemancers-nodejs-2.onrender.com/api/cart/checkout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart([]);  // Clear cart after successful checkout
      alert('Checkout successful');
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <View>
      {cart.length > 0 ? (
        cart.map((item) => (
          console.log(item, "item"),
          <View key={item.product._id}>
            <Text>Title: {item.product.title}</Text>
            <Text>Description: {item.product.description}</Text>
            <Text>Price: ${item.product.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
        ))
      ) : (
        <Text>No items in cart</Text>
      )}
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default CartScreen;

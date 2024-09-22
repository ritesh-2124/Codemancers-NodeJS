import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://codemancers-nodejs-2.onrender.com/api/products',{
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <View>
      <Text>Product List</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
            <Button title="Add to Cart" onPress={() => navigation.navigate('Cart', { product: item })} />
          </View>
        )}
      />
    </View>
  );
};

export default ProductList;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProductManagement = ({route}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const { user } = route.params; // Get user data from navigation


  let usedData = JSON.stringify(user);

  let params = JSON.parse(usedData);

  const navigation = useNavigation();

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  // Function to pick an image from the device gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [7, 5],
      quality: 1,
    });

    console.log(result, "result image");

    if (!result.canceled) {
      const imageUri = result.assets && result.assets[0] && result.assets[0].uri;
      console.log(imageUri, "result uri");
      if (imageUri) {
        setImage(imageUri);
      } else {
        Alert.alert('Error', 'Failed to get image URI');
      }
    }
  };

  // Function to handle the form submission to add a new product
  const handleAddProduct = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);

      if (image) {
        formData.append('image', {
          uri: image,
          type: 'image/jpeg', // Change this if your image is not JPEG
          name: 'photo.jpg', // Provide a filename
        });
      }

      console.log('FormData:', formData);

      const response = await axios.post(
        'https://codemancers-nodejs-2.onrender.com/api/products',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Axios sets this automatically
          },
        }
      );

      Alert.alert('Success', 'Product added successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);

    } catch (error) {
      console.error('Error Details:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to add product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Product</Text>
      <Text style={styles.header}>Name : {params.name}</Text>
      <Text style={styles.header}>Email : {params.email}</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff', // Button background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Rounded corners
    marginVertical: 10, // Margin
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default ProductManagement;

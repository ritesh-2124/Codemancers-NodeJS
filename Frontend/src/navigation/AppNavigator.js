import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ProductList from '../screens/ProductList';
import CartScreen from '../screens/CartScreen';
import ProductManagement from '../screens/ProductManagement';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Products" component={ProductList} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="ProductManagement" component={ProductManagement} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EnterEmail, EnterOTP, CreateNewPassword, PasswordCreated, OOPS } from '../forgot-password/ForgotPassword';
import { LogInPage, SignUpPage, TabRoutes, Categories, Product, HomeAccent, HomeScreen, NewArrivals, PopularTrends } from '../../export';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UseNet from '../screens/UseNet';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


class AuthNavigator extends Component {
  render() {
    return (

      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="categories" component={Categories}
          options={
            {
              headerShown: true,
              headerTitle: 'Home Accents',
              // headerStyle: { backgroundColor: '#f9f0df' }
              // headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular'}
            }
          } />     
          <Stack.Screen name="usenet" component={UseNet} options={{ headerShown: false }} />
        <Stack.Screen name="product" component={Product}
          options={
            {
              headerShown: true,
              headerTitle: 'Products',
              // headerStyle: { backgroundColor: '#f2ebd5' },
              // headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
            }
          } />
        <Stack.Screen name="homeaccent" component={HomeAccent}
          options={
            {
              headerShown: true,
              headerTitle: 'Product Profile',
              // headerStyle: { backgroundColor: '#f2ebd5' },
              // headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
            }
          } />

        <Stack.Screen name="signup" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="newarrivals" component={NewArrivals}  options={
            {
              headerShown: true,
              headerTitle: 'New Arrivals',
              // headerStyle: { backgroundColor: '#f2ebd5' },
              // headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
            }
          }/>
          <Stack.Screen name="populartrends" component={PopularTrends}  options={
            {
              headerShown: true,
              headerTitle: 'Popular Trends',
              // headerStyle: { backgroundColor: '#f2ebd5' },
              // headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
            }
          }/>
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  common: {
    marginTop: 40,
    backgroundColor: 'red',
  }
})

export default AuthNavigator;

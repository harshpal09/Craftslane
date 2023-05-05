import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LogInPage from '../forms/LogInPage';
import SignUpPage from '../forms/SignUpPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { MyCredits, MyOrders, MyProfile, EditProfile, Password, TrackOrders, WishList, AddressBook, TabRoutes, IntroSlider, ForgotPassword, MyOrderProfile, EditAddress, AddAddress } from '../../export'
// import { PasswordCreated } from '../forgot-password/ForgotPassword';
import NewProduct from '../screens/NewProduct';
import LogOut from '../screens/LogOut';
import Success from '../forgot-password/Success';
import CheckOut from '../screens/CheckOut';
import PlaceOrder from '../screens/PlaceOrder';
// import { EnterEmail, EnterOTP } from '../forgot-password/ForgotPassword';
// import MyStripeCheckout from '../screens/MyStripeCheckout';


const Stack = createNativeStackNavigator();

class MainNavigation extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName='intro'>
        <Stack.Screen name="intro" component={IntroSlider} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={LogInPage} options={{ headerShown: false }} />
        <Stack.Screen name="signup" component={SignUpPage} options={{ headerShown: true,headerTitle:"", headerTintColor: '#B48D56' }} />
        <Stack.Screen name="Tab" component={TabRoutes} options={{ headerShown: false }} />
        <Stack.Screen name="myprofile" component={MyProfile} options={{
          headerShown: true, headerTitle: 'My Profile',
        
        }} />
        <Stack.Screen name="myorder" component={MyOrders} options={{
          headerShown: true, headerTitle: 'My Orders',
         
        }} />
        <Stack.Screen name="mycredits" component={MyCredits} options={{
          headerShown: true, headerTitle: 'My Credits',
         
        }} />
        <Stack.Screen name="addressbook" component={AddressBook} options={{
          headerShown: true, headerTitle: 'Manage Your Addresses',
       
        }} />
        <Stack.Screen name="wishlist" component={WishList} options={{
          headerShown: true, headerTitle: 'My Wish List',
         
        }} />
        <Stack.Screen name="editprofile" component={EditProfile} options={{
          headerShown: true, headerTitle: 'Edit Profile',
          
        }} />
        <Stack.Screen name="password" component={Password}
          options={{
            headerShown: true, headerTitle: 'Change Password',
            
          }}
        />
        <Stack.Screen name="trackorders" component={TrackOrders}
          options={{
            headerShown: true, headerTitle: 'Track Orders',
           
          }}
        />
        <Stack.Screen name="np" component={NewProduct} options={{ headerShown: true }} />
        <Stack.Screen name="forgot" component={ForgotPassword} 
          options={{
            headerShown: true, headerTitle: 'Forgot Password',
           
          }}
        />
        <Stack.Screen name="success" component={Success} options={{ headerShown: true }} />

        <Stack.Screen name="logout" component={LogOut}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="myorderprofile" component={MyOrderProfile}
          options={{
            headerShown: true, headerTitle: 'Order Profile',
         
          }}
        />
        <Stack.Screen name="editaddress" component={EditAddress}
          options={{
            headerShown: true, headerTitle: 'Manage Your Addresses',
          
          }}
        />
        <Stack.Screen name="addaddress" component={AddAddress}
          options={{
            headerShown: true, headerTitle: 'Manage Your Addresses',
           
          }}
        />
        <Stack.Screen name="Checkout" component={CheckOut}
          options={{
            headerShown: true, headerTitle: 'checkout',
        
          }}
        />
         <Stack.Screen name="placeorder" component={PlaceOrder}
          options={{
            headerShown: true, headerTitle: 'checkout',
         
          }}
        />



      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({})

export default MainNavigation;

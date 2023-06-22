import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import LogInPage from '../forms/LogInPage';
import SignUpPage from '../forms/SignUpPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyCredits, MyOrders, MyProfile, EditProfile, Password, TrackOrders, WishList, AddressBook, TabRoutes, ForgotPassword, MyOrderProfile, EditAddress, AddAddress } from '../../export'
import NewProduct from '../screens/NewProduct';
import LogOut from '../screens/LogOut';
import Success from '../forgot-password/Success';
import CheckOut from '../screens/CheckOut';
import PlaceOrder from '../screens/PlaceOrder';
import OTPScreen from '../OTPscreen';


const Stack = createNativeStackNavigator();

class MainNavigation extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName='Tab'>
        {/* <Stack.Screen name="intro" component={IntroSlider} options={{ headerShown: false }} /> */}
        <Stack.Screen name="login" component={LogInPage} options={{ 
            headerShown: true, 
            headerTintColor: '#B48D56',
            headerTitle: 'Login',
            headerTitleStyle: { color: 'black'}
         }} />

        <Stack.Screen name="otp" component={OTPScreen} options={{ 
           headerShown: true, 
           headerTintColor: '#B48D56',
           headerTitle: 'Verify OTP',
           headerTitleStyle: { color: 'black'}
        }} />

        <Stack.Screen name="signup" component={SignUpPage} options={{ 
           headerShown: true, 
           headerTintColor: '#B48D56',
           headerTitle: 'SignUp',
           headerTitleStyle: { color: 'black'}
         }} />
         
        <Stack.Screen name="Tab" component={TabRoutes} options={{ headerShown: false }} />
        <Stack.Screen name="myprofile" component={MyProfile} options={{
          headerShown: true, headerTitle: 'My Profile', headerTintColor: '#B48D56',
          headerTitleStyle: { color: 'black'}
        
        }} />
        <Stack.Screen name="myorder" component={MyOrders} options={{
          headerShown: true,
           headerTitle: 'My Orders',
           headerTintColor: '#B48D56',
           headerTitleStyle: { color: 'black'}
         
        }} />
        <Stack.Screen name="mycredits" component={MyCredits} options={{
          headerShown: true,
           headerTitle: 'My Credits',
           headerTintColor: '#B48D56',
           headerTitleStyle: { color: 'black'}
         
        }} />
        <Stack.Screen name="addressbook" component={AddressBook} options={{
          headerShown: true,
           headerTitle: 'Manage Your Addresses',
           headerTintColor: '#B48D56',
           headerTitleStyle: { color: 'black'}
       
        }} />
        <Stack.Screen name="wishlist" component={WishList} options={{
          headerShown: true,
           headerTitle: 'My WishList',
           headerTintColor: '#B48D56',
           headerTitleStyle: { color: 'black'}
         
        }} />
        <Stack.Screen name="editprofile" component={EditProfile} options={{
          headerShown: true,
           headerTitle: 'Edit Profile',
           headerTintColor: '#B48D56',
          headerTitleStyle: { color: 'black'}
          
        }} />
        <Stack.Screen name="password" component={Password}
          options={{
            headerShown: true,
             headerTitle: 'Change Password',
             headerTintColor: '#B48D56',
             headerTitleStyle: { color: 'black'}
            
          }}
        />
        <Stack.Screen name="trackorders" component={TrackOrders}
          options={{
            headerShown: true,
             headerTitle: 'Track Orders',
             headerTintColor: '#B48D56',
             headerTitleStyle: { color: 'black'}
           
          }}
        />
        <Stack.Screen name="np" component={NewProduct} options={{ headerShown: true }} />
        <Stack.Screen name="forgot" component={ForgotPassword} 
          options={{
            headerShown: true,
             headerTitle: 'Forgot Password',
             headerTintColor: '#B48D56',
             headerTitleStyle: { color: 'black'}
           
          }}
        />
        <Stack.Screen name="success" component={Success} options={{ headerShown: true }} />

        <Stack.Screen name="logout" component={LogOut}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="myorderprofile" component={MyOrderProfile}
          options={{
            headerShown: true,
             headerTitle: 'Order Profile',
             headerTintColor: '#B48D56',
             headerTitleStyle: { color: 'black'}
         
          }}
        />
        <Stack.Screen name="editaddress" component={EditAddress}
          options={{
            headerShown: true, 
            headerTitle: 'Manage Your Addresses',
            headerTintColor: '#B48D56',
            headerTitleStyle: { color: 'black'}
          
          }}
        />
        <Stack.Screen name="addaddress" component={AddAddress}
          options={{
            headerShown: true,
             headerTitle: 'Manage Your Addresses',
             headerTintColor: '#B48D56',
             headerTitleStyle: { color: 'black'}
           
          }}
        />
        <Stack.Screen name="Checkout" component={CheckOut}
          options={{
            headerShown: true,
             headerTitle: 'Checkout',
             headerTintColor: '#B48D56',
             headerTitleStyle: { color: 'black'}
        
          }}
        />
         <Stack.Screen name="placeorder" component={PlaceOrder}
          options={{
            headerShown: true,
             headerTitle: 'Checkout',
             headerTintColor: '#B48D56',
             headerTitleStyle: { color: 'black'}
         
          }}
        />



      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({})

export default MainNavigation;

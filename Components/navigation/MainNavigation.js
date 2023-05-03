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
        <Stack.Screen name="signup" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="Tab" component={TabRoutes} options={{ headerShown: false }} />
        <Stack.Screen name="myprofile" component={MyProfile} options={{
          headerShown: true, headerTitle: 'My Profile',
          headerStyle: { backgroundColor: '#f2ebd5' },
          headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
        }} />
        <Stack.Screen name="myorder" component={MyOrders} options={{
          headerShown: true, headerTitle: 'My Orders',
          headerStyle: { backgroundColor: '#f2ebd5' },
          headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
        }} />
        <Stack.Screen name="mycredits" component={MyCredits} options={{
          headerShown: true, headerTitle: 'My Credits',
          headerStyle: { backgroundColor: '#f2ebd5' },
          headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
        }} />
        <Stack.Screen name="addressbook" component={AddressBook} options={{
          headerShown: true, headerTitle: 'Manage Your Addresses',
          headerStyle: { backgroundColor: '#f2ebd5' },
          headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
        }} />
        <Stack.Screen name="wishlist" component={WishList} options={{
          headerShown: true, headerTitle: 'My Wish List',
          headerStyle: { backgroundColor: '#f2ebd5' },
          headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
        }} />
        <Stack.Screen name="editprofile" component={EditProfile} options={{
          headerShown: true, headerTitle: 'Edit Profile',
          headerStyle: { backgroundColor: '#f2ebd5' },
          headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
        }} />
        <Stack.Screen name="password" component={Password}
          options={{
            headerShown: true, headerTitle: 'Change Password',
            headerStyle: { backgroundColor: '#f2ebd5' },
            headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
          }}
        />
        <Stack.Screen name="trackorders" component={TrackOrders}
          options={{
            headerShown: true, headerTitle: 'Track Orders',
            headerStyle: { backgroundColor: '#f2ebd5' },
            headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
          }}
        />
        <Stack.Screen name="np" component={NewProduct} options={{ headerShown: true }} />
        <Stack.Screen name="forgot" component={ForgotPassword} 
          options={{
            headerShown: true, headerTitle: 'Forgot Password',
            headerStyle: { backgroundColor: '#f2ebd5' },
            headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
          }}
        />
        <Stack.Screen name="success" component={Success} options={{ headerShown: true }} />

        <Stack.Screen name="logout" component={LogOut}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="myorderprofile" component={MyOrderProfile}
          options={{
            headerShown: true, headerTitle: 'Order Profile',
            headerStyle: { backgroundColor: '#f2ebd5' },
            headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
          }}
        />
        <Stack.Screen name="editaddress" component={EditAddress}
          options={{
            headerShown: true, headerTitle: 'Manage Your Addresses',
            headerStyle: { backgroundColor: '#f2ebd5' },
            headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
          }}
        />
        <Stack.Screen name="addaddress" component={AddAddress}
          options={{
            headerShown: true, headerTitle: 'Manage Your Addresses',
            headerStyle: { backgroundColor: '#f2ebd5' },
            headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
          }}
        />
        <Stack.Screen name="Checkout" component={CheckOut}
          options={{
            headerShown: true, headerTitle: 'checkout',
            headerStyle: { backgroundColor: '#f2ebd5' },
            headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
          }}
        />
         <Stack.Screen name="placeorder" component={PlaceOrder}
          options={{
            headerShown: true, headerTitle: 'checkout',
            headerStyle: { backgroundColor: '#f2ebd5' },
            headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' }
          }}
        />



      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({})

export default MainNavigation;

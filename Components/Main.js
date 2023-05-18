import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import FlashMessage from 'react-native-flash-message';
import UseNet from '../Components/screens/UseNet';
import axios from 'axios';
import { addItemToCart } from '../Components/redux/Actions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '../Components/navigation/MainNavigation';

export default function Main() {
  return (
    <NavigationContainer>
      <UseNet />
      <MainNavigation />
      <FlashMessage position="bottom" />
    </NavigationContainer>
  )
}
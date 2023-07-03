import React, { Fragment, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Button, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LogOut from './screens/LogOut';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileScreen, AuthNavigator, LogInPage, WishList, CartScreen, HomeScreen } from '../export'
import { useSelector, useDispatch } from 'react-redux';
import { setTokenAvailability } from '../Components/redux/Actions';
import { useIsFocused } from '@react-navigation/native';
import renderIf from './screens/renderIf';


const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  // const [tokenAvailable, setTokenAvailable] = useState(false);
  //   const [showModal, setShowModal] = useState(false);
  //   const [tabKey, setTabKey] = useState('Home');
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const tokenAvailable = useSelector(
    (state) => state.tokenAvailable
  );
  // console.log("Getting token state from redux =>",tokenAvailable)

  useEffect(() => {
    const checkTokenAvailability = async () => {
      const isToken = await AsyncStorage.getItem('token');

      if (!isToken) {
        dispatch(setTokenAvailability(false));
        console.log("Token Unavailable =>",tokenAvailable)
      } else {
        dispatch(setTokenAvailability(true));
        console.log("Token Available =>",tokenAvailable)
      }
    };

    checkTokenAvailability();
  }, []);



 console.log("Tab route=>",tokenAvailable)

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#B48D56',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
              return (
                <FontAwesome
                  name={iconName}
                  size={25}
                  color={focused ? '#b48d56' : '#666666'}
                />
              );
            } else if (route.name === 'Cart') {
              iconName = 'cart';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={25}
                  color={focused ? '#B48D56' : '#666666'}
                />
              );
            } else if (route.name === 'Favourite') {
              iconName = 'heart';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={25}
                  color={focused ? '#B48D56' : '#666666'}
                />
              );
            } else if (route.name === 'Account') {
              iconName = 'person';
              return (
                <MaterialIcons
                  name={iconName}
                  size={25}
                  color={focused ? '#B48D56' : '#666666'}
                />
              );
            } else if (route.name === 'Login') {
              iconName = 'login';
              return (
                <MaterialIcons
                  name={iconName}
                  size={25}
                  color={focused ? '#B48D56' : '#666666'}
                />
              );
            } else if (route.name === 'Logout') {
              iconName = 'logout';
              return (
                <MaterialIcons
                  name={iconName}
                  size={25}
                  color={focused ? '#B48D56' : '#666666'}
                />
              );
            }

          },
        })}
      >
        <Tab.Screen name="Home" component={AuthNavigator} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Favourite" component={WishList} />
        {renderIf(tokenAvailable)(
          <Fragment>
           <Tab.Screen name="Account" component={ProfileScreen} />
           <Tab.Screen name="Logout" component={LogOut} />
           </Fragment>
        )}

       { renderIf(!tokenAvailable)(
    
          <Tab.Screen name="Login" component={LogInPage} />
       )}
       
       
      </Tab.Navigator>

    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabRoutes;

import React, { useEffect, useState,Component } from 'react';
import { View, StyleSheet, Image,Text } from 'react-native';
import { ProfileScreen, AuthNavigator, WishList,CartScreen } from '../export'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LogOut from './screens/LogOut';

import AsyncStorage from '@react-native-async-storage/async-storage';










const Tab = createBottomTabNavigator();
// const [number, setNumber] = useState(0);

const TabRoutes = () => {

    return (
        <Tab.Navigator  screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#B48D56',
            tabBarInactiveTintColor: 'black',
        }}
        >
            <Tab.Screen name="Home" component={AuthNavigator} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <FontAwesome name="home" size={25} color={focused ? '#b48d56' : '#666666'} />
                    )
                }
            }} />
            <Tab.Screen name="Cart" component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons name="cart" size={25} color={focused ? '#B48D56' : '#666666'} />
                        )
                    },
                    unmountOnBlur: true,
                    headerShown: true,
                    headerTitle: 'Shopping Cart',
                    headerTitleStyle: { fontSize: 20 },
                    tabBarBadge:4
                }
                } />
            <Tab.Screen name="Favourite" component={WishList}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons name="heart" size={25} color={focused ? '#B48D56' : '#666666'} />
                        )
                    },
                    headerShown: true,
                    headerTitleStyle: { fontSize: 20 },
                    


                }} />
            <Tab.Screen name="Account" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialIcons name="person" size={25} color={focused ? '#B48D56' : '#666666'} />
                        )
                    }
                }} />
            <Tab.Screen name="logout" component={LogOut}

                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialIcons name="logout" size={25} color={focused ? '#B48D56' : '#666666'} />
                        )
                    }
                }} />


        </Tab.Navigator>
    );
}

const decor = StyleSheet.create({
    main: {
        borderRadius: 20
    }
})

export default TabRoutes;

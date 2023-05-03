import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-ionicons';
import { HomeScreen, ProfileScreen, More, CartScreen, FavouriteScreen, AuthNavigator, WishList, } from '../export'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LogOut from './screens/LogOut';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

const TabRoutes = () => {
    
    const [data, setData] = useState('');
    const setBadge = async() =>{
     
        let badge = await AsyncStorage.getItem('badge');
        setData(JSON.parse(badge));
        
      
    }

    useEffect(() => {
      setBadge();
    
    }, [])
    


    return ( 
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#B48D56',
            tabBarInactiveTintColor: 'black',
        }}>
            <Tab.Screen name="Home" component={AuthNavigator} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <MaterialCommunityIcons name="home" size={25} color={focused ? '#b48d56' : '#666666'} />
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
                    headerShown: true,
                    tabBarBadge: data,
                    headerTitle: 'Shopping Cart',
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 22},
                }} />
            <Tab.Screen name="Favourite" component={WishList}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons name="cards-heart" size={25} color={focused ? '#B48D56' : '#666666'} />
                        )
                    },
                    headerShown: true,
                    headerTitle: 'Favourites',
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 22},
                    
                    

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

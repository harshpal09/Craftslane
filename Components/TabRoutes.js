import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-ionicons';
import { HomeScreen, ProfileScreen, More, CartScreen, FavouriteScreen, AuthNavigator, LogInPage, Categories, WishList, } from '../export'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LogOut from './screens/LogOut';
// import ProfileNavigations from './navigation/ProfileNavigations';


const Tab = createBottomTabNavigator();

const TabRoutes = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#B48D56',
            tabBarInactiveTintColor: 'black',
        }} sceneContainerStyle={{backgroundColor:'red'}}>
            <Tab.Screen name="Home" component={AuthNavigator} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <Icon name="home" size={25} color={focused ? '#b48d56' : '#666666'} />
                    )
                }
            }} />
            <Tab.Screen name="Cart" component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name="cart" size={25} color={focused ? '#B48D56' : '#666666'} />
                        )
                    },
                    tabBarBadge:4   
                }
                }  />
            <Tab.Screen name="Favourite" component={WishList}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name="heart" size={25} color={focused ? '#B48D56' : '#666666'} />
                        )
                    },
                    headerShown: true,
                    // headerTitle: 'New Arrivals',
                    headerStyle: { backgroundColor: '#f2ebd5' },
                    headerTitleStyle: { fontFamily: 'PlayfairDisplay-Regular' },
                    

                }} />
            <Tab.Screen name="Account" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name="person" size={25} color={focused ? '#B48D56' : '#666666'} />
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

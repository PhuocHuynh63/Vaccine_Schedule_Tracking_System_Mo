import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VacineAdmin from './VacineAdmin';
import HomeAdmin from './HomeAdmin';
import AccountAdmin from './AccountAdmin';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorAdmin() {
    return (
      <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Vaccine') {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Account') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              headerShown: false, 
            })}
          >
            <Tab.Screen name="Home" component={HomeAdmin} />
            <Tab.Screen name="Vaccine" component={VacineAdmin} />
            <Tab.Screen name="Account" component={AccountAdmin} />
          </Tab.Navigator>
    )
  }
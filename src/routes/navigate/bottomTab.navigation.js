import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeSc/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Prodd from '../../screens/HomeSc/Prodd';
import Activities from '../../screens/HomeSc/Activities';
import Schedule from '../../screens/HomeSc/Schedule';
import AccountScreen from '../../screens/HomeSc/AccountScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Activities') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Schedule') {
            iconName = focused ? 'document-text' : 'document-text-outline';
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Contact" component={Prodd} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Account" component={AccountScreen
        
      } />
    </Tab.Navigator>
  );
}

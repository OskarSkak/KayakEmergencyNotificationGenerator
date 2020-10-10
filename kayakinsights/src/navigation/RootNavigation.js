import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GpsSensorScreen from '../screens/GpsSensorScreen';
import StackNavigation from './StackNavigation';


//Creating the navigation type 
const Tab = createBottomTabNavigator();



const RootNavigation = () => {
    return (
        <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="stack" component={StackNavigation} />
        </Tab.Navigator>
      </NavigationContainer>
    )
}

export default RootNavigation;
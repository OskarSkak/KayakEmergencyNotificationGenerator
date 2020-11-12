import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackNavigation from './StackNavigation';
import HomeScreen from '../screens/HomeScreen';

//Creating the navigation type
const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="Conctacts" component={StackNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GyroScopeScreen from '../screens/GyroScopeScreen';
import GpsSensorScreen from '../screens/GpsSensorScreen';
import SensorHomeScreen from '../screens/SensorHomeScreen';


//Creating the navigation type 
const Tab = createStackNavigator();

const StackNavigation = () => {
    return (
        <Tab.Navigator initialRouteName="home" >
            <Tab.Screen name="home" component={SensorHomeScreen} />
            <Tab.Screen name="gps" component={GpsSensorScreen} />
          <Tab.Screen name="gyro" component={GyroScopeScreen} />
        </Tab.Navigator>

    )
}

export default StackNavigation;
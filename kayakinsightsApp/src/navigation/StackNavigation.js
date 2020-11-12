import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ContactListScreen from '../screens/ContactListScreen';
import {Button, Pressable, Text} from 'react-native';
import AddContactScreen from '../screens/AddContactScreen';
import EditContactScreen from '../screens/EditContactScreen';

//Creating the navigation type
const Tab = createStackNavigator();

const StackNavigation = ({navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('add')}>
              <Text style={{marginRight: 20, fontSize: 15}}>Add Contact</Text>
            </Pressable>
          ),
        }}
        name="contactList"
        component={ContactListScreen}
      />
      <Tab.Screen name="add" component={AddContactScreen} />
      <Tab.Screen name="edit" component={EditContactScreen} />
    </Tab.Navigator>
  );
};

export default StackNavigation;

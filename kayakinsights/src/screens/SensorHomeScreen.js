import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable } from 'react-native';

const DATA = [
    {
        id: '1',
        title: 'GyroScope',
        route: 'gyro',

    },
    {
        id: '2',
        title: 'Gps',
        route: 'gps',
        
    }
];
const Item = ({ title, onPress , style }) => (
    <Pressable onPress={onPress} style={[styles.item , style]} >
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
    </Pressable>
  );
  
  const SensorHomeScreen = ({navigation}) => {
      
    const renderItem = ({ item }) => {
        return (
        <Item title={item.title} onPress={() => navigation.navigate(item.route) } /> 
        )
    }

      
    
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });


export default SensorHomeScreen;
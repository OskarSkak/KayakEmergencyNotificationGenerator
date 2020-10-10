import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';



const GpsSensorScreen = ({navigation}) => {
    return (
        <View style={styles.container} >
            <Pressable onPress={() => navigation.navigate('gyro')} >
            <Text>GPS Sensor</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
        
    }
})

export default GpsSensorScreen;
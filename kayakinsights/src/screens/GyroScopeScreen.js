import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';

const  GyroScopeScreen = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  const _subscribe = () => {
    this._subscription = Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;
  return (
    <View >
      <Text >Gyroscope:</Text>
      <Text >
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View >
        <TouchableOpacity onPress={_toggle} >
          <Text>Toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} >
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
    if (!n) {
      return 0;
    }
  
    return Math.floor(n * 100) / 100;
  }


  export default GyroScopeScreen;
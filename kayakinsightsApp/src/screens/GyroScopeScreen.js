import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';

const GyroScopeScreen = ({callback, interval}) => {
  const [data, setData] = useState({});

  let subscription = null;
  setUpdateIntervalForType(SensorTypes.gyroscope, interval);

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    subscription = gyroscope.subscribe((result) => {
      setData(result);
      callback(result);
    });
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    subscription = null;
  };

  let {x, y, z} = data;
  return null;
};

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

export default GyroScopeScreen;

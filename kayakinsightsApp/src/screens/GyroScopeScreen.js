import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
  L,
} from 'react-native-sensors';
const axios = require('axios').default;

const GyroScopeScreen = ({callback, interval}) => {
  const [gpsData, setGpsData] = useState({});
  const [gyroData, setGyroData] = useState({});
  const [accData, setAccData] = useState({});
  const mountedRef = React.useRef(true);

  let subscriptionGyro = null;
  let subscriptionAcc = null;
  setUpdateIntervalForType(SensorTypes.gyroscope, interval);
  setUpdateIntervalForType(SensorTypes.accelerometer, interval);

  useEffect(() => {
    _toggle();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const _toggle = () => {
    if (subscriptionGyro && subscriptionAcc) {
      _unsubscribe();
    } else {
      _subscribeGyro();
      _subscribeAcc();
    }
  };

  const _subscribeAcc = () => {
    subscriptionAcc = accelerometer.subscribe((data) => {
      if (!mountedRef.current) return null;
      setGpsData(data);
      let date = new Date(data.timestamp);
      data.timestamp = date;
      axios
        .post('http://4c29fe2fe353.ngrok.io/accelerometer', data)
        .then((res) => {
          console.log('Acc' + res.status);
        })
        .catch((err) => console.log(err));
    });
  };

  const _subscribeGyro = () => {
    subscriptionGyro = gyroscope.subscribe((data) => {
      if (!mountedRef.current) return null;
      setGpsData(data);
      let date = new Date(data.timestamp);
      data.timestamp = date;
      axios
        .post('http://4c29fe2fe353.ngrok.io/gyroscope', data)
        .then((res) => {
          console.log('Gyro' + res.status);
        })
        .catch((err) => console.log(err));
    });
  };

  const _unsubscribe = () => {
    subscriptionGyro && subscriptionGyro.remove();
    subscriptionGyro = null;
    subscriptionAcc && subscriptionAcc.remove();
    subscriptionAcc = null;
  };

  return null;
};

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

export default GyroScopeScreen;

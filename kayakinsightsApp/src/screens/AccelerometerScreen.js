import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {log} from 'react-native-reanimated';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
  L,
} from 'react-native-sensors';
const axios = require('axios').default;

class AccelerometerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gyroscopeData: {},
      subscription: null,
      updateInterval: null,
    };
  }

  componentDidMount() {
    setUpdateIntervalForType(SensorTypes.accelerometer, this.props.interval);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  setUpdateInterval = (updateInterval) => {
    setUpdateIntervalForType(SensorTypes.accelerometer, updateInterval);
  };

  startSampling = () => {
    this._subscribe();
  };

  stopSampling = () => {
    this._unsubscribe();
  };

  _subscribe = () => {
    this._unsubscribe();
    const subscription = accelerometer.subscribe((data) => {
      let date = new Date(data.timestamp);
      data.timestamp = date;
      //console.log(`ACC: ${data.x}`);
      this.props.onRecivedAccelerometer(data);
    });
    this.setState({subscription});
  };

  _unsubscribe = () => {
    this.state.subscription && this.state.subscription.unsubscribe();
    this.setState({subscription: null});
  };

  render() {
    return null;
  }
}

export default AccelerometerScreen;

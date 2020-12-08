import React, {useState, useEffect} from 'react';
import {
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
  L,
} from 'react-native-sensors';

class GyroScopeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gyroscopeData: {},
      subscription: null,
      updateInterval: null,
    };
  }

  componentDidMount() {
    setUpdateIntervalForType(SensorTypes.gyroscope, this.props.interval);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  setUpdateInterval = (updateInterval) => {
    setUpdateIntervalForType(SensorTypes.gyroscope, updateInterval);
  };

  startSampling = () => {
    this._subscribe();
  };

  stopSampling = () => {
    this._unsubscribe();
  };

  _subscribe = () => {
    this._unsubscribe();
    const subscription = gyroscope.subscribe((data) => {
      let date = new Date(data.timestamp);
      data.timestamp = date;
      this.props.onRecivedGyroscope(data);
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

export default GyroScopeScreen;

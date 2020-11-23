import React, {useState, useEffect} from 'react';
import {Button, PermissionsAndroid, Text, View} from 'react-native';
const axios = require('axios').default;
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

class GpsSensorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gpsData: [],
      subscription: null,
    };
  }

  startSampling = () => {
    this._subscribe();
  };

  stopSampling = () => {
    this._unsubscribe();
  };

  _subscribe = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      const intervalForGps = setInterval(() => {
        this.getGps();
      }, 1000);
      this.setState({subscription: intervalForGps});
    });
  };

  _unsubscribe = () => {
    clearInterval(this.state.subscription);
  };

  getGps = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        let date = new Date(info.timestamp);
        let data = {
          timestamp: date,
          altitude: info.coords.altitude,
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          altitudeAccuracy: info.coords.altitudeAccuracy,
          accuracy: info.coords.accuracy,
        };

        this.props.onRecivedGps(data);
      },
      (err) => console.log(err),
      {maximumAge: 0, enableHighAccuracy: true, forceRequestLocation: true},
    );
  };

  componentDidMount() {}

  requestCameraPermission = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((e) => {
      console.log(e);
    });
  };

  render() {
    return null;
  }
}

export default GpsSensorScreen;

import React, {useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

const axios = require('axios').default;
import Geolocation from 'react-native-geolocation-service';

const GpsSensorScreen = ({callback, interval}) => {
  const [gpsData, setGpsData] = useState({});

  const mountedRef = React.useRef(true);

  let subscription = null;
  let watchId = 0;

  const test = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Starting');
        watchId = Geolocation.watchPosition(
          (position) => {
            console.log(position);
            console.log('hej');
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {interval: 1000, fastestInterval: 1000},
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    _toggle();
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const _toggle = async () => {
    await test();
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    subscription = null;
  };

  return null;
};

export default GpsSensorScreen;

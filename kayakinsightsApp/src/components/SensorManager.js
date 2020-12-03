import React from 'react';
import {View} from 'react-native';
import {log} from 'react-native-reanimated';
import AccelerometerScreen from '../screens/AccelerometerScreen';
import GpsSensorScreen from '../screens/GpsSensorScreen';
import GyroScopeScreen from '../screens/GyroScopeScreen';
import ApiComponent from './ApiComponent';
import BatteryHandler from './BatteryHandler';
import FallDetection from './FallDetection';

class SensorManager extends React.Component {
  gyroscope = React.createRef();
  accelerometer = React.createRef();
  gps = React.createRef();
  apiService = React.createRef();
  batteryService = React.createRef();
  fallDetectionService = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      gpsData: [],
      accelerometerData: [],
      gyroscopeData: [],
      data: {
        accelerometer: [],
        gps: [],
        gyroscope: [],
        power: 0,
        timestamp: new Date(),
      },
      sendDataIntervalID: null,
      intervalMultiplicator: 1,
      powerSaving: false,
    };
  }

  startSendingSampling = () => {
    const id = setInterval(() => {
      this.handleData();
    }, this.state.intervalMultiplicator*this.props.sendingInterval);
    this.setState({sendDataIntervalID: id});
  };

  stopSendingSampling = () => {
    clearInterval(this.state.sendDataIntervalID);
  };

  handleData = () => {
    var batteryLevel = this.batteryService.current.getBattery()
    if (this.props.isInternetReachable) {
      this.apiService?.current.sendData(
        this.state.data,
        batteryLevel,
      );
      console.log("Good connection => online detection")
    } else {
      const data = this.state.data;
      this.fallDetectionService.current.detect(data);
    }
    if (batteryLevel >= 0.89 && !this.state.powerSaving){
      console.log("Low battery level : increase API calls interval")
      this.stopSendingSampling();
      this.setState({intervalMultiplicator: 2,powerSaving: true});
      this.startSendingSampling();
    }
    this.clearStateData();
  };

  componentWillUnmount() {
    clearInterval(this.state.sendDataIntervalID);
  }

  clearStateData = () => {
    this.setState({
      data: {
        accelerometer: [],
        gps: [],
        gyroscope: [],
        power: 0,
        timestamp: new Date(),
      },
    });
  };

  addSensorData = ({action, type}) => {
    switch (type) {
      case 'GPS':
        this.setState({
          data: {
            ...this.state.data,
            gps: [...this.state.data.gps, action.data],
          },
        });
        break;
      case 'GYROSCOPE':
        this.setState({
          data: {
            ...this.state.data,
            gyroscope: [...this.state.data.gyroscope, action.data],
          },
        });
        break;
      case 'ACCELEROMETER':
        this.setState({
          data: {
            ...this.state.data,
            accelerometer: [...this.state.data.accelerometer, action.data],
          },
        });
        break;
      default:
        break;
    }
  };

  startSampling = () => {
    console.info('Starting sampling...');
    if (this.gps.current) this.gps.current.startSampling();
    if (this.gyroscope.current) this.gyroscope.current.startSampling();
    if (this.accelerometer.current) this.accelerometer.current.startSampling();
  };

  stopSampling = () => {
    console.info('Stopping sampling...');
    if (this.gyroscope.current) this.gyroscope.current.stopSampling();
    if (this.accelerometer.current) this.accelerometer.current.stopSampling();
    if (this.gps.current) this.gps.current.stopSampling();
  };

  fallDetected = () => {};

  renderGyroScope = () => {
    if (this.props?.enableGyroscope) {
      return (
        <GyroScopeScreen
          ref={this.gyroscope}
          onRecivedGyroscope={(data) =>
            this.addSensorData({type: 'GYROSCOPE', action: {data}})
          }
        />
      );
    }
  };

  renderAccelerometer = () => {
    if (this.props.enableAccelerometer) {
      return (
        <AccelerometerScreen
          ref={this.accelerometer}
          onRecivedAccelerometer={(data) =>
            this.addSensorData({type: 'ACCELEROMETER', action: {data}})
          }
        />
      );
    }
  };
  renderGPS = () => {
    if (this.props.enableGps) {
      return (
        <GpsSensorScreen
          ref={this.gps}
          onRecivedGps={(data) =>
            this.addSensorData({type: 'GPS', action: {data}})
          }
        />
      );
    }
  };

  render = () => {
    return (
      <View>
        {this.renderGPS()}
        {this.renderGyroScope()}
        {this.renderAccelerometer()}
        <BatteryHandler ref={this.batteryService} />
        <ApiComponent ref={this.apiService} />
        <FallDetection
          ref={this.fallDetectionService}
          fallDetected={() => this.props.fallDetected()}
        />
      </View>
    );
  };
}

export default SensorManager;

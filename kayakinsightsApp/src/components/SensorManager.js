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
  permanentData = {
    accelerometer: [],
    gps: [],
    gyroscope: [],
    timestamp: null,
  } 
  batteryLevel = null

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
      intervalMultiplicator: 0.5,
      powerSaving: false,
    };
  }

  startSendingSampling = () => {
    const id = setInterval(() => {
      this.handleData();
    }, this.state.intervalMultiplicator * this.props.sendingInterval);
    this.setState({sendDataIntervalID: id});
  };

  stopSendingSampling = () => {
    clearInterval(this.state.sendDataIntervalID);
  };

  handleData = () => {
    this.batteryLevel = this.batteryService.current.getBattery();
    if (this.props.isInternetReachable && this.batteryLevel < 0.60) {
      this.apiService?.current.sendData(this.state.data, this.batteryLevel);
      console.log('Good connection => online detection');
    } else {
      if (!this.props.isInternetReachable)
      {
        console.log("Bad connection => local detection running")
      } else if (this.batteryLevel >= 0.60){
        console.log('Battery above 60% => local processing for performance');
      }
      const data = this.state.data;
      this.fallDetectionService.current.detect(data);
      if (this.permanentData.timestamp === null)
      {
        this.permanentData.timestamp = data.timestamp;
      }
      for (const i in data.accelerometer){
        this.permanentData = {
          ...this.permanentData,
          accelerometer: [...this.permanentData.accelerometer, data.accelerometer[i]]
        }
      }
      for (const i in data.gps){
        this.permanentData = {
          ...this.permanentData,
          gps: [...this.permanentData.gps, data.gps[i]]
        }
      }
      for (const i in data.gyroscope){
        this.permanentData = {
          ...this.permanentData,
          gyroscope: [...this.permanentData.gyroscope, data.gyroscope[i]]
        }
      }
      console.log("################ PERMANENT ############")
      var str = JSON.stringify(this.permanentData, null, 4); // (Optional) beautiful indented output.
      console.log(str); 
    }
    if (this.batteryLevel <= 0.15 && !this.state.powerSaving) {
      console.log('Low battery level : increase API calls interval');
      this.stopSendingSampling();
      this.setState({intervalMultiplicator: 2, powerSaving: true});
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
    this.apiService?.current.sendFinalData(this.permanentData, this.batteryLevel);
  };

  fallDetected = () => {};

  renderGyroScope = () => {
    if (this.props?.enableGyroscope) {
      return (
        <GyroScopeScreen
          interval={100}
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
          interval={100}
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
          interval={100}
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

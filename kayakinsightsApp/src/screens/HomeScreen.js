import React, {useEffect} from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import GyroScopeScreen from './GyroScopeScreen';
import {Button, Card, Layout, Modal, Text} from '@ui-kitten/components';
import Timer from '../components/Timer';

import GpsSensorScreen from './GpsSensorScreen';
import {log} from 'react-native-reanimated';
import SocketHandler from '../components/SocketHandler';
import getContactsFromAsyncStorage from '../components/AsyncStorage';
import SmsHandler from '../components/SmsHandler';
import {imageUrl} from '../../api';
import SensorManager from '../components/SensorManager';
import SignalManager from '../components/SignalManager';
class HomeScreen extends React.Component {
  SensorManager = React.createRef();
  smsService = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isTracking: false,
      isFalling: false,
      isGps: false,
      isInternetReachable: true,
    };
  }

  displayText = () => {
    return this.state.isTracking ? 'Stop Tracking' : 'Start Tracking';
  };

  startTracking = () => {
    if (this.state.isTracking) {
      this.SensorManager.current?.stopSampling();
      this.SensorManager.current?.stopSendingSampling();
      this.setState((prevState) => ({
        isTracking: !prevState.isTracking,
      }));
    } else {
      this.setState((prevState) => ({
        isTracking: !prevState.isTracking,
      }));

      this.SensorManager.current?.startSampling();
      this.SensorManager.current?.startSendingSampling();
    }
  };

  fallDetected = () => {
    //this.smsService?.current.sendSms();
    console.log('detected');
    this.setState({isFalling: true});
  };

  sendSms = () => {
    console.log('sms');
    this.smsService.current.sendSms();
    this.setState({isFalling: false});
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={{uri: imageUrl}} style={styles.image}>
          <View style={styles.opacity}>
            <Pressable
              onPress={() => this.startTracking()}
              style={styles.button}>
              {/*!this.state.isTracking ? null : (
                <GyroScopeScreen
                  callBackAcc={(acc) => console.log(acc)}
                  callBackGyr={(gyr) => {
                    console.log(gyr);
                  }}
                  interval={3000}
                />
                )*/}

              <Text style={styles.text}>{this.displayText()}</Text>
            </Pressable>
            <Modal
              style={{borderRadius: 20, height: 300}}
              visible={this.state.isFalling}>
              <Card disabled={true}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginHorizontal: 90,
                    marginBottom: 50,
                    fontSize: 30,
                  }}>
                  Did you fall?
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    marginBottom: 30,
                    fontSize: 15,
                  }}>
                  <Timer callback={() => this.sendSms()} />
                </Text>
                <Button
                  style={{marginBottom: 50}}
                  onPress={() => {
                    this.setState({isFalling: false});
                    //OnChangeIsFalling(false);
                    //clearInterval(myInterval);
                  }}>
                  No, i'm proffesional
                </Button>
              </Card>
            </Modal>
          </View>

          <View style={{backgroundColor: 'black'}}>
            {/*this.state.isGps ? (
              <GpsSensorScreen
                callBackGps={(gps) => {
                  console.log(gps);
                }}
                seconds={3000}
              />
            ) : (
              <Text>false</Text>
            )*/}
          </View>
        </ImageBackground>
        <SignalManager
          badInternetConnection={() => {
            this.setState({isInternetReachable: false});
          }}
          goodInternetConnection={() => {
            this.setState({isInternetReachable: true});
          }}
        />
        <SocketHandler fallDetected={() => this.fallDetected()} active={true} />
        <SmsHandler ref={this.smsService} />
        <SensorManager
          enableApiCommunication={false}
          ref={this.SensorManager}
          enableGyroscope={true}
          enableAccelerometer={true}
          enableGps={true}
          sendingInterval={10000}
          isInternetReachable={this.state.isInternetReachable}
          fallDetected={() => this.fallDetected()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 10,
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
    flexDirection: 'column',
  },
  opacity: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 250,
    height: 250,
    backgroundColor: 'rgba(4,0,1,0.7)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
  },
});

export default HomeScreen;

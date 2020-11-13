import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  PermissionsAndroid,
  View,
} from 'react-native';
import GyroScopeScreen from './GyroScopeScreen';
import {Button, Card, Layout, Modal, Text} from '@ui-kitten/components';
import Timer from '../components/util';
import SmsAndroid from 'react-native-get-sms-android';
import AsyncStorage from '@react-native-community/async-storage';
import GpsSensorScreen from './GpsSensorScreen';
import signalr from 'react-native-signalr';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
const hub_endpoint = 'http://3d073f890d09.ngrok.io/apiHub';
const image = {
  uri:
    'https://images.unsplash.com/photo-1551679630-2eed87aefae6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
};

const HomeScreen = () => {
  const [isTracking, onChangeIsTracking] = React.useState(false);
  const [isFalling, OnChangeIsFalling] = React.useState(false);
  const [isGps, OnChangeIsGps] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [isTimeStarted, onChangeIsTimeStarted] = React.useState(false);
  const initialSeconds = 30;
  const [seconds, setSeconds] = React.useState(initialSeconds);

  const [user, onChangeUserText] = React.useState('');
  const [message, onChangeMessageText] = React.useState('');
  const [conn, setConn] = React.useState(null);
  const [messageLog, setMessageLog] = React.useState([]);
  const [connectionState, setConnectedStateText] = React.useState('');
  const [isConnected, setConnected] = React.useState(false);

  let myInterval = null;
  const displayText = isTracking ? 'Stop Tracking' : 'Start Tracking';

  React.useEffect(() => {
    console.log('effect');

    // Setting the log level to Debug will generate tons more diagnostic
    // messages in the console log which can help give a deeper understanding
    // of how SignalR works and what it's doing under the covers
    const connection = new HubConnectionBuilder()
      .withUrl(hub_endpoint)
      .configureLogging(LogLevel.Debug)
      .build();

    setConnectedStateText(`Trying to connect to ${hub_endpoint}`);

    // Try to start the connection
    connection
      .start()
      .then(() => {
        setConnectedStateText(`Connected to ${hub_endpoint}`);
        setConnected(true);
      })
      .catch((err) =>
        console.log(`Error starting the connection: ${err.toString()}`),
      );

    // Handle connection closing
    connection.onclose(async () => {
      setConnectedStateText(`Disconnected from ${hub_endpoint}`);
      setConnected(false);
    });

    // Incoming messages will grow the message log array
    connection.on('hub', (e, a) => {
      if (e === true) {
        // The persona has falled!!!
        onChangeIsTracking(false);
        OnChangeIsFalling(true);
      } else {
        console.log('Not falled! ');
      }
    });

    // This isn't very elegant but I'm still learning about scope and state in React Native
    // This seemed like the logical way to make the connection object available to the 'Reconnect' button
    // but I think the connection object/handler should be encapsulated into it's own component
    setConn(connection);
  }, []);

  const sendSms = async () => {
    let sendSmsTo = [];

    // do your SMS stuff here
    try {
      let jsonValue = await AsyncStorage.getItem('@contacts');
      const value = JSON.parse(jsonValue);
      value.forEach((element) => {
        sendSmsTo.push(element.phone);
      });
    } catch (err) {
      console.log(err);
    }
    console.log(sendSmsTo);

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
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

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        SmsAndroid.autoSend(
          JSON.stringify(sendSmsTo),
          'WORKING!!',
          (fail) => {
            console.log('Failed with this error: ' + fail);
          },
          (success) => {
            console.log('SMS sent successfully');
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const start = () => {
    myInterval = setInterval(() => {
      if (seconds > 0) {
        let second = seconds - 1;
        setSeconds(second);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.opacity}>
          <Pressable
            onPress={() => {
              onChangeIsTracking(!isTracking);
            }}
            style={styles.button}>
            {!isTracking ? null : <GyroScopeScreen interval={1000} />}

            <Text style={styles.text}>{displayText}</Text>
          </Pressable>
          <Modal style={{borderRadius: 20, height: 300}} visible={isFalling}>
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
                <Timer callback={() => sendSms()} />
              </Text>
              <Button
                style={{marginBottom: 50}}
                onPress={() => {
                  onChangeIsTracking(false);
                  OnChangeIsFalling(false);
                  clearInterval(myInterval);
                }}>
                No, i'm proffesional{' '}
              </Button>
              <Pressable style={{marginBottom: 50}}>
                <Text>Send sms</Text>
              </Pressable>
            </Card>
          </Modal>
        </View>
        <Button
          onPress={() => {
            OnChangeIsGps(true);
          }}>
          Fall?
        </Button>
      </ImageBackground>
    </View>
  );
};

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

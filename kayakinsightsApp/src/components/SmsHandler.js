import SmsAndroid from 'react-native-get-sms-android';
import React, {Component} from 'react';
import {PermissionsAndroid} from 'react-native';
import getContactsFromAsyncStorage from './AsyncStorage';
import {appUrl} from '../../api';

class SmsHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smsList: [],
      permission: false,
    };
  }

  async componentDidMount() {
    let contacts = await getContactsFromAsyncStorage();
    this.setState({smsList: contacts});
    await this.getPermisson();
  }

  getPermisson = async () => {
    let granted;
    try {
      granted = await PermissionsAndroid.request(
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
    } catch (err) {
      console.warn(err);
    }
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      this.setState({permission: true});
    }
  };

  sendSms = () => {
    if (this.state.permission) {
      console.log('Sending sms to ' + this.state.smsList);
      SmsAndroid.autoSend(
        JSON.stringify(this.state.smsList),
        `${appUrl}`,
        (fail) => {
          console.log('Failed with this error: ' + fail);
        },
        (success) => {
          console.log('SMS sent successfully');
        },
      );
    }
  };

  render() {
    return null;
  }
}

export default SmsHandler;

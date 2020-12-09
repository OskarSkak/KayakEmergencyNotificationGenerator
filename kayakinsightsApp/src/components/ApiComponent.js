import React from 'react';
import {apiUrl} from '../../api';
const axios = require('axios').default;

class ApiComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  sendData = (data, battery) => {
    data.power = battery;
    data.timeStamp = new Date();
    axios
      .post(apiUrl + '/Batch', data)
      .then((res) => {
        if (res.status === 200) {
          console.log('Succesfully sent data');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendFinalData = (data, battery) => {
    data.power = battery;
    data.timeStamp = new Date();
    axios
      .post(apiUrl + '/Batch/Final', data)
      .then((res) => {
        if (res.status === 200) {
          console.log('Succesfully sent data');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return null;
  }
}

export default ApiComponent;

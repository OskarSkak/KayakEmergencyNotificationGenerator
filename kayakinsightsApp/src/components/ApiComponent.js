import React from 'react';
import {apiUrl} from '../../api';
const axios = require('axios').default;

class ApiComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Mounted');
  }

  sendData = (data, battery) => {
    data.power = battery;
    data.timeStamp = +new Date();
    console.log(data);
    /* axios
      .post(apiUrl + '/Batch', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      */
  };

  render() {
    return null;
  }
}

export default ApiComponent;

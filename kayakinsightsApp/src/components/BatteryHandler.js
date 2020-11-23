import React from 'react';
import {getBatteryLevel} from 'react-native-device-info';

class BatteryHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batteryLevel: undefined,
    };
  }

  componentDidMount() {
    this.updateBatteryLevel();
  }

  getBattery = () => {
    this.updateBatteryLevel();
    return this.state.batteryLevel;
  };

  updateBatteryLevel = () => {
    getBatteryLevel().then((level) => {
      this.setState({batteryLevel: level});
    });
  };

  render() {
    return null;
  }
}

export default BatteryHandler;

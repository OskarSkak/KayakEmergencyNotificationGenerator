import React from 'react';
import {getBatteryLevel,getPowerState} from 'react-native-device-info';

class BatteryHandler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      batteryLevel: undefined,
      plugState: null,
    };
  }

  componentDidMount() {
    this.updateBatteryLevel();
    this.updatePulgInState();
  }


  getBattery = () => {
    this.updateBatteryLevel();
    return this.state.batteryLevel;
  };

  getPlugSTate = () => {
    this.updatePulgInState();
    return this.state.plugState;
  };

  updateBatteryLevel = () => {
    getBatteryLevel().then((level) => {
      this.setState({batteryLevel: level});
    });
  };

  updatePulgInState = () => {
    getPowerState().then((state) => {
      this.setState({plugState: state.batteryState}) 
    });
  }



  render() {
    return null;
  }
}

export default BatteryHandler;

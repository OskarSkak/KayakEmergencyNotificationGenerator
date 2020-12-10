import React from 'react';
import NetInfo from '@react-native-community/netinfo';

class SignalManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscription: null,
    };
  }

  componentDidMount() {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.details.cellularGeneration === '3g' || state.details.cellularGeneration === '4g' || state.isInternetReachable === true) {
        this.props.goodInternetConnection();
      }
      if (state.details.cellularGeneration === '2g') {
        this.props.badInternetConnection();
      }
      if (state.isInternetReachable === false) {
        this.props.badInternetConnection();
      }
      if (state.type === 'wifi' && state.isInternetReachable === true){
        this.props.wifiConnected();
      }
    });
    this.setState({subscription: unsubscribe});
  }

  componentWillUnmount() {
    this.state.subscription();
  }

  render() {
    return null;
  }
}

export default SignalManager;

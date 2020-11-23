import React from 'react';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import apiUrl from '../../api';

class SocketHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: undefined,
      connection: undefined,
    };
  }

  componentDidMount() {
    if (this.props.active) {
      const connection = new HubConnectionBuilder()
        .withUrl(apiUrl + '/apiHub')
        .configureLogging(LogLevel.Error)
        .build();

      // Try to start the connection
      connection
        .start()
        .then(() => {
          this.setState({isConnected: true});
          console.log(`Connection to ${apiUrl}/apuHub Succesfull`);
        })
        .catch((err) =>
          console.log(`Error starting the connection: ${err.toString()}`),
        );

      // Handle connection closing
      connection.onclose(async () => {
        this.setState({isConnected: false});
      });

      // Incoming messages will grow the message log array
      connection.on('TEST', (e, a) => {
        if (e === true || a === true) {
          // The persona has falled!!!
          //CALLBACK
          this.props.fallDetected();
        } else {
          console.log('Not falled! ');
        }
      });

      this.setState({connection: connection});
    }
  }

  componentWillUnmount() {}

  render() {
    return null;
  }
}

export default SocketHandler;

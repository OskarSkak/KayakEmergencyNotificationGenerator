import React from 'react';

class FallDetection extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  detect(data) {
      
    this.props.fallDetected();
  }

  render() {
    return null;
  }
}

export default FallDetection;

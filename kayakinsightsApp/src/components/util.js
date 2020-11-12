import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';

const Timer = ({callback}) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    let myInterval = setInterval(() => {
      console.log(seconds);
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          callback();
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <View>
      {minutes === 0 && seconds === 0 ? (
        <Text>Sending sms with location..</Text>
      ) : (
        <Text style={{color: 'red'}}>
          App will inform your contacts in
          {seconds < 10 ? `0${seconds}` : seconds}s
        </Text>
      )}
    </View>
  );
};

export default Timer;

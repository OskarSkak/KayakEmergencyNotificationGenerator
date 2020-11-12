import React from 'react';
import {Input, Button} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const AddContactScreen = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.marginTop2} />
      <Input
        placeholder="Peter Hansen..."
        value={name}
        label="Name"
        onChangeText={(nextValue) => setName(nextValue)}
      />
      <View style={styles.marginTop2} />
      <Input
        placeholder="+4553683578"
        value={phone}
        label="Phone number"
        onChangeText={(nextValue) => setPhone(nextValue)}
      />
      <View style={styles.marginTop2} />
      <Input
        placeholder="test@test.com"
        value={email}
        label="Email"
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <View style={styles.marginTop2} />

      <Button
        onPress={async () => {
          let value = null;
          try {
            let jsonValue = await AsyncStorage.getItem('@contacts');
            if (jsonValue !== null) {
              // value previously stored
              value = JSON.parse(jsonValue);
              let contact = {id: randomNumber(), name, email, phone};
              value.push(contact);

              await AsyncStorage.setItem('@contacts', JSON.stringify(value));
            }
            if (jsonValue === null) {
              let value = [];
              let contact = {id: randomNumber(), name, email, phone};
              value.push(contact);
              console.log(value);
              await AsyncStorage.setItem('@contacts', JSON.stringify(value));
            }
          } catch (e) {
            // error reading value
          }

          navigation.pop();
        }}>
        Add
      </Button>
      <View style={styles.marginTop2} />
      <Button
        onPress={() => {
          AsyncStorage.clear();
        }}>
        Clear
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  marginTop2: {
    marginTop: 20,
  },
});

export default AddContactScreen;

const randomNumber = () => {
  return Math.round(Math.random() * 1000);
};

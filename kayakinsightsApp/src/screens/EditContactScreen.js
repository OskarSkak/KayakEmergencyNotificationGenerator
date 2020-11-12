import React from 'react';
import {Input, Button} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

const EditContactScreen = ({route, navigation}) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  let index = 0;
  const isFocused = useIsFocused();
  const {item} = route.params;
  const getData = async () => {
    let jsonValue = await AsyncStorage.getItem('@contacts');
    const value = JSON.parse(jsonValue);
    let finalItem = value.find((e) => e.id === item.id);
    index = value.findIndex((e) => e.id === item.id);
    setName(finalItem.name);
    setPhone(finalItem.phone);
    setEmail(finalItem.email);
  };

  React.useEffect(() => {
    async function get() {
      await getData();
    }
    get();
  }, [isFocused]);

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
          try {
            let jsonValue = await AsyncStorage.getItem('@contacts');
            if (jsonValue !== null) {
              // value previously stored
              value = JSON.parse(jsonValue);
              let contact = {id: item.id, name, email, phone};
              value[index] = contact;
              console.log(index);

              await AsyncStorage.setItem('@contacts', JSON.stringify(value));
            }
          } catch (e) {
            // error reading value
            console.log(e);
          }

          navigation.pop();
        }}>
        Update
      </Button>
      <View style={styles.marginTop2} />
      <Button
        style={{backgroundColor: 'red', borderColor: 'red'}}
        onPress={async () => {
          try {
            let jsonValue = await AsyncStorage.getItem('@contacts');
            if (jsonValue !== null) {
              // value previously stored
              value = JSON.parse(jsonValue);
              value.splice(index, 1);

              await AsyncStorage.setItem('@contacts', JSON.stringify(value));
            }
          } catch (e) {
            // error reading value
            console.log(e);
          }

          navigation.pop();
        }}>
        Delete
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

export default EditContactScreen;

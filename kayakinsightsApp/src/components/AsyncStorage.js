import AsyncStorage from '@react-native-community/async-storage';

const getContactsFromAsyncStorage = async () => {
  let contacts = [];
  try {
    let jsonValue = await AsyncStorage.getItem('@contacts');
    const value = JSON.parse(jsonValue);
    value.forEach((element) => {
      contacts.push(element.phone);
    });
  } catch (err) {
    console.log(err);
  }
  return contacts;
};

export default getContactsFromAsyncStorage;

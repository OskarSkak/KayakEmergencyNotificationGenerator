import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Icon, List, ListItem} from '@ui-kitten/components';
import {useIsFocused} from '@react-navigation/native';

const ContactListScreen = ({navigation}) => {
  const [contacts, setContacts] = React.useState([]);
  const isFocused = useIsFocused();
  const getData = async () => {
    let jsonValue = await AsyncStorage.getItem('@contacts');
    const value = JSON.parse(jsonValue);
    setContacts(value);
  };

  React.useEffect(() => {
    async function get() {
      await getData();
    }
    get();
  }, [isFocused]);
  const onClickEdit = (props) => {
    navigation.navigate('edit', {item: props});
  };
  const renderItemAccessory = (props) => {
    return (
      <Button onPress={() => onClickEdit(props)} size="tiny">
        Edit
      </Button>
    );
  };

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.name} ${index + 1}`}
      description={`${item.email} ${index + 1}`}
      accessoryRight={() => {
        return renderItemAccessory(item);
      }}
    />
  );

  return (
    <View style={{flex: 1}}>
      <List data={contacts} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 192,
  },
});

export default ContactListScreen;

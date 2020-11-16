import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../components/Button';

import { useNavigation } from '../utils';

export const Home = () => {
  const { navigate } = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
        <Text>Home Screen</Text>
      </View>
      <View style={styles.body}>
        <Button title="Logout" onTap={() => navigate('login')} />
      </View>
      <View style={styles.footer}>
        <Icon style={styles.icon} name={'usd'} size={35} color="blue" />
        <Icon5 name={'user'} size={35} color="blue" />
        <View style={styles.categories} >
          <Icon name={'bars'} size={30} color="blue" onPress={() => navigate('Categories')}/>
          <Text>categories</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  navigation: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 9,
    backgroundColor: 'white'
  },
  loginView: {
    marginTop: 200,
    marginLeft: 20,
    marginRight: 20,
    height: 400,
    backgroundColor: 'white'
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    backgroundColor: "#9F3EDF",
    paddingBottom: 0
  },
  icon: {
    justifyContent: 'center'
  },
  categories:{
    display:"flex",
    alignItems:"center"
  }
});

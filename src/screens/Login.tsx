import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView
} from 'react-native';
import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import CheckBox from '@react-native-community/checkbox';


import { useSelector, useDispatch } from 'react-redux';

import { ApplicationState, onLogin } from '../redux';
import { useNavigation } from '../utils';

export const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { navigate } = useNavigation();

  const { user, error } = useSelector(
    (state: ApplicationState) => state.userReducer
  );
  const { token } = user;
  useEffect(() => {
    if (token !== undefined) {
      navigate('Home');
    }
    //do nothing
  }, [user]);

  const onTapLogin = (email: string, password: string) => {
    dispatch(onLogin(email, password));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
        <Image source={require('../images/logo.png')} />
      </View>
      <View style={styles.body}>
        <View style={styles.loginView}>
          <TextField placeholder="Email Id" onTextChange={setEmail} />
          <TextField
            placeholder="Password"
            onTextChange={setPassword}
            isSecure={true}
          />
          <View style={styles.checkContainer}>
            <Text style={{ marginVertical: 5 }}>Login as Admin</Text>
            <CheckBox disabled={false}
              style={styles.check}
            />
          </View>
          <Button title="Login" onTap={() => onTapLogin(email, password)} />

          {token !== undefined && (
            <Text style={{ marginLeft: 20, marginRight: 20 }}>
              {JSON.stringify(user)}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.footer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  navigation: {
    flex: 2,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 50
  },
  body: {
    flex: 9,
  },
  checkContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  check: {
    color: '#9F3EDF',
    marginVertical: 'auto',
    textShadowColor: '#9F3EDF'
  },
  loginView: {
    marginTop: 130,
    marginLeft: 20,
    marginRight: 20,
    height: 350,
  },
  footer: {
    flex: 1,
  }
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import logo from '../images/logo.png';

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

  const onTapLogin = () => {
    dispatch(onLogin(email, password));
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Image  source={logo}/>
      </View>
      <View style={styles.body}>
        <View style={styles.loginView}>
          <TextField  placeholder="Email Id" onTextChange={setEmail} />
          <TextField
            placeholder="Password"
            onTextChange={setPassword}
            isSecure={true}
          />
          <Button title="Login" onTap={onTapLogin} />

          {token !== undefined && (
            <Text style={{ marginLeft: 20, marginRight: 20 }}>
              {JSON.stringify(user)}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  navigation: {
    flex: 2,
    alignItems: 'center',
    marginTop:100
  },
  body: {
    flex: 9,
  },
  loginView: {
    marginTop: 150,
    marginLeft: 20,
    marginRight: 20,
    height: 400,
  },
  footer: {
    flex: 1,
  }
});

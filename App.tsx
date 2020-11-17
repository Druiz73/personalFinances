import React from 'react';
import MyStack from './src/useNavigation'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}
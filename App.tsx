import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider } from 'react-redux';
import { store } from './src/redux';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { NewCategory } from './src/screens/categories/NewCategory'

const switchNavigator = createSwitchNavigator({
  loginStack: {
    screen: createStackNavigator(
      {
        NewCategory: NewCategory,
        Login: Login,
        Home: Home,
      },
      {
        defaultNavigationOptions: {
          headerShown: false,
        },
      }
    ),
  },
});

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
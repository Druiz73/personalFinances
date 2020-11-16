import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { NewCategory } from './src/screens/categories/NewCategory'
import { Categories } from './src/screens/categories/Categories'

const switchNavigator = createSwitchNavigator({
  loginStack: {
    screen: createStackNavigator(
      {
        Login: Login,
        Home: Home,
        Categories: Categories,
        NewCategory: NewCategory,
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
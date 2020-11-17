import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login'
import Categories from './screens/categories/Categories';
import NewCategory from './screens/categories/NewCategory';
import Exchanges from './screens/exchanges/Exchanges';
import NewExchanges from './screens/exchanges/NewExchanges';


export enum AppScreens {
  Home = 'Home',
  Login = 'Login',
  Categories = 'Categories',
  NewCategory = 'NewCategory',
  Exchanges = 'Exchanges',
  NewExchanges = 'NewExchanges'
}

export type StackParamList = {
  Login: undefined;
  Home: undefined;
  Categories: undefined;
  NewCategory: undefined;
  Exchanges: undefined;
  NewExchanges: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const MyStack: React.FunctionComponent = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={AppScreens.Login} component={Login} />
      <Stack.Screen
        name={AppScreens.Home}
        component={Home} />
      <Stack.Screen name={AppScreens.Categories} component={Categories} />
      <Stack.Screen name={AppScreens.NewCategory} component={NewCategory} />
      <Stack.Screen name={AppScreens.Exchanges} component={Exchanges} />
      <Stack.Screen name={AppScreens.NewExchanges} component={NewExchanges} />
    </Stack.Navigator>
  );
};


export default MyStack;

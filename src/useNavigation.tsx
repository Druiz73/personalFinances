import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
//components
import Home from './screens/Home';
import Login from './screens/Login'
import Categories from './screens/categories/Categories';
import NewCategory from './screens/categories/NewCategory';
import Currency from './screens/currencies/Currency';
import NewCurrency from './screens/currencies/NewCurrency';
import Client from './screens/clients/Client';
import NewClient from './screens/clients/NewClient';
import ClientEdit from './screens/clients/ClientEdit';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';

//local storage library
import AsyncStorage from '@react-native-async-storage/async-storage';
//navigation tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export enum AppScreens {
  Home = 'Home',
  Login = 'Login',
  Categories = 'Categories',
  NewCategory = 'NewCategory',
  Currency = 'Currency',
  NewCurrency = 'NewCurrency',
  Clients = 'Clients',
  ClientEdit = 'ClientEdit'
}

export type StackParamList = {
  Login: undefined;
  Home: undefined;
  Categories: undefined;
  NewCategory: undefined;
  Currency: undefined;
  NewCurrency: undefined;
  Clients: undefined;
  ClientEdit: undefined;
};

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Stack = createStackNavigator<StackParamList>();


const MyStack: React.FunctionComponent = (props) => {

  const [token, setToken] = useState('')

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        setToken(value)
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  }, [])


  if (token) {
    let iconName: string;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Tab.Navigator

            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Clients') {
                  iconName = 'user';
                }
                else if (route.name === 'Categories') {
                  iconName = 'bars';
                }
                else if (route.name === 'Currency') {
                  iconName = 'usd';
                }
                // You can return any component that you like here!
                return <Icon name={iconName} size={35} color="white" />
              },
              style: { backgroundColor: "blue", color: "white" }
            })}
            tabBarOptions={{
              activeTintColor: 'white',
              inactiveTintColor: 'white',
              activeBackgroundColor: '#646cff',
              inactiveBackgroundColor: 'blue',
            }}

          >
            <Tab.Screen name="Home">
              {() => (
                <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
                  <SettingsStack.Screen
                    name="Home"
                    component={Home}
                  />
                  <SettingsStack.Screen name="home" component={Home} />
                </SettingsStack.Navigator>
              )}
            </Tab.Screen>
            <Tab.Screen name="Clients">
              {() => (
                <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
                  <SettingsStack.Screen name="Clients" component={Client} />
                  <SettingsStack.Screen name="New Client" component={NewClient} />
                  <SettingsStack.Screen name="ClientEdit" component={ClientEdit} />
                </SettingsStack.Navigator>
              )}
            </Tab.Screen>
            <Tab.Screen name="Categories">
              {() => (
                <HomeStack.Navigator screenOptions={{ headerShown: false }} >
                  <HomeStack.Screen name="Category" component={Categories} />
                  <HomeStack.Screen name="New Category" component={NewCategory} />
                </HomeStack.Navigator>
              )}
            </Tab.Screen>
            <Tab.Screen name="Currency">
              {() => (
                <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                  <HomeStack.Screen name="Currency" component={Currency} />
                  <HomeStack.Screen name="NewCurrency" component={NewCurrency} />
                </HomeStack.Navigator>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    );
  }
  else {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={AppScreens.Login} component={Login} />
      </Stack.Navigator>
    );
  }

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
});


export default MyStack;

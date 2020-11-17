import React from 'react';
//components
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../useNavigation';

type HomeScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.Home>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

const Home: React.FC<HomeScreenProps> = (props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Welcome" />
      <View style={styles.body}>
        <Button title="Logout" onTap={() => navigation.navigate(AppScreens.Login)} />
      </View>
      <Footer />
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


});


export default Home;

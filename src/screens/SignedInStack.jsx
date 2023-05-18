import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './home';
import {Payment} from './Payment';
import {Event} from './Event';
import {Contact} from './Contact';
import Navbar from '../components/Navbar';
import {Header} from '../components/Header';

const Stack = createNativeStackNavigator();

const header = ({route}) => {
  return route.params;
};

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          header: () => <Header />,
        }}>
        <Stack.Screen name="Home" component={Home} options={header} />
        <Stack.Screen name="Event" component={Event} options={header} />
        <Stack.Screen name="Payment" component={Payment} options={header} />
        <Stack.Screen name="Contact" component={Contact} options={header} />
      </Stack.Navigator>
      <Navbar />
    </NavigationContainer>
  );
};

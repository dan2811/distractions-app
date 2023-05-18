import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {useGlobalState} from '../state/initialState';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {calculateDimension} from '../styles/helpers';

const Navbar = () => {
  const navigation = useNavigation();
  const {setActiveScreen, activeScreen} = useGlobalState();

  const handleNavigation = (screen: string) => {
    console.log('navigating');
    console.log(activeScreen);
    setActiveScreen(screen);
    navigation.dispatch(
      CommonActions.navigate({
        name: screen,
      }),
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleNavigation('Home')}
        style={styles.center}>
        <Icon
          name="home"
          size={40}
          style={activeScreen === 'Home' ? styles.activeIcon : styles.icon}
        />
        <Text
          style={
            activeScreen === 'Home' ? styles.activeNavText : styles.navText
          }>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation('Event')}
        style={styles.center}>
        <Icon
          name="event"
          size={40}
          style={activeScreen === 'Event' ? styles.activeIcon : styles.icon}
        />
        <Text
          style={
            activeScreen === 'Event' ? styles.activeNavText : styles.navText
          }>
          Event
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation('Payment')}
        style={styles.center}>
        <Icon
          name="payment"
          size={40}
          style={activeScreen === 'Payment' ? styles.activeIcon : styles.icon}
        />
        <Text
          style={
            activeScreen === 'Payment' ? styles.activeNavText : styles.navText
          }>
          Payment
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation('Contact')}
        style={styles.center}>
        <Icon
          name="chat"
          size={40}
          style={activeScreen === 'Contact' ? styles.activeIcon : styles.icon}
        />
        <Text
          style={
            activeScreen === 'Contact' ? styles.activeNavText : styles.navText
          }>
          Contact
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: calculateDimension(1, 'width'),
    height: calculateDimension(0.1, 'height'),
    backgroundColor: '#2b2b2b',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  navText: {
    color: '#a79f7c',
    fontSize: 13,
    fontWeight: 'bold',
  },
  activeNavText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
  icon: {
    color: '#a79f7c',
  },
  activeIcon: {
    color: '#fff',
  },
  center: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Navbar;

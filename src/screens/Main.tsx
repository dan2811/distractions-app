import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {SignedInStack} from './SignedInStack';
import {SignedOutStack} from './SignedOutStack';
import {Header} from '../components/Header';
import {useGlobalState} from '../state/initialState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';
import {getFromBackend, retrieveClientEvent} from '../server/apiCalls';
import {UserData} from '../types';

export const Main = () => {
  const {isSignedIn, setIsSignedIn, setUserData, setChatRooms, setClientEvent} =
    useGlobalState();

  const handlePersistedLogin = async (userData: UserData) => {
    const me = await getFromBackend('/api/users/me?populate=*', userData.jwt);
    setUserData(userData);
    setChatRooms(me.chats);
    OneSignal.setExternalUserId(userData.user.id.toString(), results =>
      console.log('ONE SIGNAL RESULTS', results),
    );
    setIsSignedIn(true);
    retrieveClientEvent(userData, setClientEvent);
  };

  useEffect(() => {
    const getUserData = async () => {
      console.debug('getting user data from async storage');
      const userDataJson = await AsyncStorage.getItem('userData');
      if (!userDataJson) {
        console.debug('no persisted login found');
        return;
      }
      const userData = JSON.parse(userDataJson);
      console.debug('got user data from async storage', userData);
      if (!userData.jwt) {
        setIsSignedIn(false);
        return;
      }
      handlePersistedLogin(userData);
    };
    getUserData();
  }, []);

  return (
    <View style={styles.background}>
      {isSignedIn ? (
        <SignedInStack />
      ) : (
        <>
          <Header />
          <SignedOutStack />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000000',
  },
});

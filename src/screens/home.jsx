import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../components/Button';
import CountdownTimer from '../components/CountdownTimer';
import {useGlobalState} from '../state/initialState';
import {colours} from '../styles/globalStyles';
import {getFromBackend, retrieveClientEvent} from '../server/apiCalls';
import OneSignal from 'react-native-onesignal';
import LoadingSpinner from '../components/LoadingSpinner';

export const Home = () => {
  const {clientEvent, setIsSignedIn, setChatRooms, setClientEvent, user} =
    useGlobalState();

  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setIsSignedIn(false);
  };

  useEffect(() => {
    const setInitialState = async () => {
      const me = await getFromBackend(
        '/api/users/me?populate=*',
        user.data.jwt,
      );

      setChatRooms(me.chats);

      OneSignal.setExternalUserId(user.data.user.id.toString(), results =>
        console.log('ONE SIGNAL RESULTS', results),
      );

      retrieveClientEvent(user.data, setClientEvent);
      setLoading(false);
    };
    setInitialState();
  }, []);

  return loading ? (
    <LoadingSpinner text="loading" />
  ) : (
    <View style={styles.container}>
      <CountdownTimer date={new Date(clientEvent?.date)} />
      <Button onPress={handleLogout} title="Log out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
    backgroundColor: colours.background,
  },
});

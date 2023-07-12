import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import CountdownTimer from '../components/CountdownTimer';
import {useGlobalState} from '../state/initialState';
import {colours} from '../styles/globalStyles';
import {getFromBackend, retrieveClientEvent} from '../server/apiCalls';
import OneSignal from 'react-native-onesignal';
import LoadingSpinner from '../components/LoadingSpinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionCard from '../components/containers/ActionCard';
import {addDays, formatDateTime} from '../lib/dateTimeUtils';
import {NavigationWrapper} from '../components/NavigationWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {calculateDimension} from '../styles/helpers';

export const Home = () => {
  const {clientEvent, setIsSignedIn, setChatRooms, setClientEvent, user} =
    useGlobalState();

  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.clear();
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
      console.log('user data: ', user.data);
      retrieveClientEvent(user.data, setClientEvent);
      setLoading(false);
    };
    setInitialState();
  }, []);

  return loading ? (
    <LoadingSpinner text="loading" />
  ) : (
    clientEvent && (
      <SafeAreaView style={styles.container}>
        {new Date(clientEvent?.date).getTime() > new Date().getTime() ? (
          <>
            <CountdownTimer date={new Date(clientEvent?.date)} />
            <NavigationWrapper navigateTo="Payment">
              <ActionCard
                actionText="Pay your deposit"
                dueDate={
                  formatDateTime(clientEvent.depositDueDate) ||
                  'Could not find date'
                }
                isComplete={clientEvent.isDepositPaid}
              />
            </NavigationWrapper>
            <NavigationWrapper navigateTo="Payment">
              <ActionCard
                actionText="Pay your remaining balance"
                dueDate={
                  formatDateTime(addDays(new Date(clientEvent.date), -60)) ||
                  'Could not find date'
                }
                isComplete={clientEvent.amountDue === 0}
              />
            </NavigationWrapper>
            {clientEvent.clientCanEdit && (
              <NavigationWrapper navigateTo="Event">
                <ActionCard
                  actionText="Edit the details of your event"
                  dueDate={formatDateTime(
                    addDays(new Date(clientEvent.date), -14),
                  )}
                  isComplete={false}
                />
              </NavigationWrapper>
            )}
          </>
        ) : null}
        <Button onPress={handleLogout} title="Log out" />
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: calculateDimension(0.95, 'height'),
    backgroundColor: colours.background,
  },
});

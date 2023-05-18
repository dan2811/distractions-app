import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import {useGlobalState} from '../state/initialState';
import {fontFam} from '../styles/globalStyles';
import {fontSize} from '../styles/globalStyles';
import {colours} from '../styles/globalStyles';
import {retrieveClientEvent} from '../server/apiCalls';
import {SetList} from '../components/Sets';
import {Sets} from '../types';
import {calculateDimension} from '../styles/helpers';

export const Event = () => {
  const [refreshing, setRefreshing] = useState(false);
  let {clientEvent, setClientEvent, user} = useGlobalState();
  const handleRefreshSets = () => {
    if (user.data !== null) {
      setRefreshing(true);
      try {
        retrieveClientEvent(user.data, setClientEvent);
      } catch (err) {
        console.log(err);
      } finally {
        setRefreshing(false);
      }
    }
  };

  const handleEditSet = (set: Sets) => {
    console.log(set);
  };
  if (clientEvent !== null) {
    return (
      <View style={styles.container}>
        <View style={styles.mainDetails}>
          <Text style={styles.text}>
            Event Date: {new Date(clientEvent.date).toLocaleDateString()}
          </Text>
          <Text style={styles.text}>Package: {clientEvent.package.name}</Text>
          <Text style={styles.text}>Location: {clientEvent.location}</Text>
        </View>
        <SetList
          data={clientEvent.sets as Sets[]}
          handleRefreshSets={handleRefreshSets}
          refreshing={refreshing}
          handleEditSet={handleEditSet}
        />
      </View>
    );
  } else {
    return <LoadingSpinner text="Loading your event data..." />;
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    height: calculateDimension(0.9, 'height'),
    width: '100%',
    backgroundColor: '#000000',
    paddingTop: calculateDimension(0.02, 'height'),
  },
  mainDetails: {
    height: '10%',
    width: '90%',
    margin: '5%',
  },
  flatList: {
    width: '90%',
    margin: '5%',
  },
  setContainer: {
    width: '100%',
  },
  setHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  set: {
    width: '100%',
    borderWidth: 2,
    borderColor: colours.tint,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#8c875f',
    borderRadius: 5,
    height: 'auto',
    width: 'auto',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1F1F1F',
    fontSize: fontSize.small,
    fontFamily: fontFam,
  },
  icon: {
    paddingLeft: 10,
  },
  text: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.medium,
  },
  listText: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.small,
  },
  clientNotesText: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.small,
    paddingTop: 10,
  },
});

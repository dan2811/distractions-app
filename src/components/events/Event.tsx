import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ClientEvent, Sets} from '../../types';
import {Icon, Text} from 'react-native-elements';
import {
  colours,
  fontFam,
  fontSize,
  fontWeight,
} from '../../styles/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../containers/InfoCard';
import EditableTextfield from '../containers/EditableTextfield';
import {SetList} from './Sets';
import {putToBackend, retrieveClientEvent} from '../../server/apiCalls';
import {useGlobalState} from '../../state/initialState';
import {calculateDimension} from '../../styles/helpers';
import {formatDateTime} from '../../lib/dateTimeUtils';
import EditSetNotes from './EditSetNotes';
import BackButton from '../BackButton';

interface Props {
  event: ClientEvent;
  setSelectedEvent: (input: ClientEvent) => void;
}

const Event = ({event, setSelectedEvent}: Props) => {
  const [location, setLocation] = useState(event.location);
  const [refreshing, setRefreshing] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [set, setSet] = useState<Sets | null>(null);
  const {setClientEvent, user, clientEvent} = useGlobalState();

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

  const handleSetLocation = async () => {
    if (!clientEvent || !user.data) {
      return;
    }
    setLocationLoading(true);
    try {
      const endpoint = `/api/events/${clientEvent.id}`;
      const data = JSON.stringify({data: {location}});
      const res = await putToBackend(endpoint, user.data.jwt, data);
      if (!res.ok) {
        throw new Error(`Update location failed with status: ${res.status}`);
      }
      retrieveClientEvent(user.data, setClientEvent);
    } catch (e) {
      console.error(e);
    }
    setLocationLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {set ? (
            <BackButton resetState={setSet} resetValue={null} />
          ) : (
            <BackButton resetState={setSelectedEvent} resetValue={null} />
          )}
          <Text style={set ? styles.setHeading : styles.pageHeading}>
            {set
              ? set.name
              : `${formatDateTime(event.date, false)} - ${event.package.name}`}
          </Text>
        </View>
        {set ? (
          <EditSetNotes set={set} />
        ) : (
          <>
            <InfoCard
              label={'Location'}
              loading={locationLoading}
              input={
                <EditableTextfield
                  value={location}
                  onChangeText={text => {
                    setLocation(text);
                  }}
                  save={handleSetLocation}
                  placeholder="Please give us as much detail as possible about where your event is being held. Feel free to add the full address, links to the venue's website or detailed directions."
                  multiline
                />
              }
            />
            <Text style={styles.subHeading}>Your sets:</Text>
            <SetList
              data={event.sets as Sets[]}
              handleRefreshSets={handleRefreshSets}
              refreshing={refreshing}
              setEditSet={setSet}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: colours.background,
  },
  container: {
    backgroundColor: colours.background,
    height: calculateDimension(0.87, 'height'),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  pageHeading: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.large,
    fontWeight: fontWeight.medium,
    marginLeft: '5%',
  },
  setHeading: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.large,
    fontWeight: fontWeight.medium,
  },
  subHeading: {
    color: colours.faded,
    fontFamily: fontFam,
    fontSize: fontSize.medium,
    fontWeight: fontWeight.light,
    marginLeft: '5%',
  },
});

export default Event;

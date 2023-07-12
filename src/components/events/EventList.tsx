import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TranslucentContainer} from '../containers/TranslucentContainer';
import {Text} from 'react-native-elements';
import {calculateDimension} from '../../styles/helpers';
import {colours, fontFam, fontSize} from '../../styles/globalStyles';
import {ClientEvent} from '../../types';
import {formatDateTime} from '../../lib/dateTimeUtils';
import InfoCard from '../containers/InfoCard';

interface Props {
  events: ClientEvent[];
  setSelectedEvent: (input: ClientEvent) => void;
}

const EventList = ({events, setSelectedEvent}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Your Events</Text>
      </View>
      {events.map(event => {
        return (
          <TouchableOpacity
            onPress={() => setSelectedEvent(event)}
            key={event.id}>
            <InfoCard
              text=""
              label={`${formatDateTime(event.date, false)} - ${
                event.package.name
              }`}
              loading={false}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: calculateDimension(0.9, 'height'),
    width: '100%',
    backgroundColor: colours.background,
    paddingTop: calculateDimension(0.02, 'height'),
  },
  header: {
    justifyContent: 'center',
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

export default EventList;

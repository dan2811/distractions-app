import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {colours, fontFam, fontSize} from '../../styles/globalStyles';
import {Transaction} from '../../types';
import {formatDateTime} from '../../lib/dateTimeUtils';

const InfoCard = ({id, amount, date, status, method}: Transaction) => {
  const [showId, setShowId] = useState(false);
  const toggleShowId = () => {
    setShowId(!showId);
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          toggleShowId();
        }}>
        <View>
          {amount && <Text style={styles.amount}>{`£${amount}`}</Text>}
          {method && <Text style={[styles.method]}>{method}</Text>}
        </View>
        <View>
          {date && (
            <Text style={[styles.date]}>{formatDateTime(date, false)}</Text>
          )}
          {status && <Text style={[styles.status]}>{status}</Text>}
        </View>
      </TouchableOpacity>
      {showId && <Text style={[styles.id]}>Payment ID: {id}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: colours.tint,
    borderRadius: 40,
    minHeight: 80,
    padding: 20,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
  },
  method: {
    color: colours.tint,
    fontFamily: fontFam,
    fontSize: fontSize.small,
  },
  amount: {
    fontFamily: fontFam,
    fontSize: fontSize.small,
    color: colours.faded,
  },
  date: {
    fontFamily: fontFam,
    color: colours.tint,
    fontSize: fontSize.small,
  },
  status: {
    fontFamily: fontFam,
    color: colours.tint,
    fontSize: fontSize.small,
  },
  id: {
    maxWidth: '90%',
    fontFamily: fontFam,
    color: colours.tint,
    alignSelf: 'center',
    fontSize: fontSize.small,
  },
});

export default InfoCard;

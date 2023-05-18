import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {colours, fontFam, fontWeight} from '../../styles/globalStyles';

export const UnreadMessageCounter = ({count}: {count: number}) => {
  return count > 0 ? (
    <View style={styles.unreadMessagesContainer}>
      <Text style={styles.unreadMessages}>{count}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  unreadMessages: {
    color: colours.background,
    fontFamily: fontFam,
    fontWeight: fontWeight.light,
    alignSelf: 'center',
  },
  unreadMessagesContainer: {
    backgroundColor: colours.faded,
    borderRadius: 200,
    alignSelf: 'center',
    padding: '5%',
    minWidth: '65%',
  },
});

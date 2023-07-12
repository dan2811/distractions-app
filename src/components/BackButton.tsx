import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {colours} from '../styles/globalStyles';

const BackButton = <TResetStateFunc extends Function, TResetValue>({
  resetState,
  resetValue,
}: {
  resetState: TResetStateFunc;
  resetValue: TResetValue;
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => resetState(resetValue)}>
      <Icon name="arrow-back-ios" color={colours.tint} size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    backgroundColor: colours.background,
    padding: 10,
  },
});

export default BackButton;

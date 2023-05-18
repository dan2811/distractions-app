import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {colours} from '../styles/globalStyles';

const BackButton = ({
  setSelectedRoom,
}: {
  setSelectedRoom: (input: number) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setSelectedRoom(-1)}>
      <Icon name="arrow-back-ios" color={colours.tint} size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    backgroundColor: colours.background,
    padding: 10,
  },
});

export default BackButton;

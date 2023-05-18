import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {colours, fontFam, fontSize, fontWeight} from '../../styles/globalStyles';

const FullyPaidBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.banner}>You have nothing left to pay</Text>
      <Icon name="check" size={40} style={styles.checkMark} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a79f7c',
    height: 60,
    width: '96%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  banner: {
    color: colours.contrast,
    textAlign: 'center',
    paddingRight: 10,
    fontFamily: fontFam,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.medium,
  },
  checkMark: {
    color: 'green',
    backgroundColor: 'green',
    borderRadius: 50,
    padding: 1,
  },
});

export default FullyPaidBanner;

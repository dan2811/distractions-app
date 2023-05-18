import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colours, fontFam, fontSize, fontWeight} from '../../styles/globalStyles';

const PaymentTile = ({label, amount}: {label: string; amount: number}) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.heading}>{label}</Text>
      <Text style={styles.amount}>£{amount}</Text>
    </View>
  );
};

export default PaymentTile;

const styles = StyleSheet.create({
  heading: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.medium,
  },
  amount: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontWeight: fontWeight.heavy,
    fontSize: fontSize.large,
    alignSelf: 'center',
  },
  tile: {
    borderRadius: 5,
    padding: 10,
    width: '48%',
    aspectRatio: 2 / 1,
    borderColor: '#a79f7c',
    borderWidth: 2,
    marginBottom: 18,
  },
});

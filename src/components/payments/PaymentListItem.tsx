import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {
  colours,
  fontFam,
  fontSize,
  fontWeight,
} from '../../styles/globalStyles';

const PaymentListItem = ({date, amount}: {date: string; amount: number}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.paymentDetails}>
        You paid £{amount} on {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.tint,
    height: 40,
    paddingLeft: 30,
    justifyContent: 'center',
    marginBottom: 10,
  },
  paymentDetails: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.small,
    fontWeight: fontWeight.medium,
  },
});

export default PaymentListItem;

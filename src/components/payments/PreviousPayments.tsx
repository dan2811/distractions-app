import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colours, fontFam, fontSize} from '../../styles/globalStyles';
import {Transaction} from '../../types';
import PaymentListItem from './PaymentListItem';

const PreviousPayments = ({payments}: {payments: Transaction[]}) => {
  return (
    <View style={styles.container}>
      {payments.map(payment => (
        <PaymentListItem
          key={payment.id}
          date={payment.date}
          amount={payment.amount}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: colours.background,
    width: '100%',
    height: 100,
  },
});

export default PreviousPayments;

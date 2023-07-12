import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Transaction} from '../../types';
import PaymentListItem from './PaymentListItem';
import {calculateDimension} from '../../styles/helpers';

const PreviousPayments = ({payments}: {payments: Transaction[]}) => {
  return (
    <View style={styles.container}>
      {payments.map(payment => (
        <PaymentListItem
          key={payment.id}
          id={payment.id}
          amount={payment.amount}
          date={payment.date}
          status={payment.status}
          method={payment.method}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: calculateDimension(1, 'height'),
  },
});

export default PreviousPayments;

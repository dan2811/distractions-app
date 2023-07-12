import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {EventPaymentInfo} from '../../types';
import {
  colours,
  fontFam,
  fontSize,
  fontWeight,
} from '../../styles/globalStyles';
import {camelCaseToTitleCase} from '../../lib/stringManipulation';
import {sortArrayOfObjectsByKeyAlphabetically} from '../../lib/sorting';

const PaymentDetailsTable = ({
  paymentInfo,
}: {
  paymentInfo: EventPaymentInfo;
}) => {
  const renderItem = ({item}: {item: any}) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={[styles.label, styles.mediumFont]}>
          {camelCaseToTitleCase(item.key)}:
        </Text>
      </View>
      <View style={styles.cell}>
        <Text style={[styles.value, styles.mediumFont]}>£{item.value}</Text>
      </View>
    </View>
  );

  const paymentInfoKeys = Object.keys(paymentInfo) as Array<
    keyof EventPaymentInfo
  >;

  let data: any = [];

  paymentInfoKeys.forEach(key => {
    switch (key) {
      case 'amountDue':
        data.push({
          key: 'Total Remaining',
          value: paymentInfo[key],
        });
        break;
      case 'deposit':
        data.push({
          key: 'Deposit',
          value: paymentInfo[key],
        });
        break;
      case 'gross':
        data.push({
          key: 'Total Cost',
          value: paymentInfo[key],
        });
        break;
    }
  });


  console.log(data);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderBottomColor: colours.tint,
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  mediumFont: {
    fontFamily: fontFam,
    fontWeight: fontWeight.light,
    fontSize: fontSize.smallToMedium,
  },
  label: {
    color: colours.contrast,
  },
  value: {
    color: colours.contrast,
  },
});

export default PaymentDetailsTable;

import React, {useEffect, useRef, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Button} from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import FullyPaidBanner from '../components/payments/FullyPaidBanner';
import PaymentTile from '../components/payments/PaymentTile';
import PreviousPayments from '../components/payments/PreviousPayments';
import {
  getFromBackend,
  postToBackend,
  retrieveClientEvent,
} from '../server/apiCalls';
import {useGlobalState} from '../state/initialState';
import {Transaction, ClientEvent, UserData, ClientTokenResult} from '../types';
import {env} from '../../env';
import {updateClientEventWithPayment} from '../lib/payment';
import {Icon, Text} from 'react-native-elements';
import {colours, fontFam, fontSize} from '../styles/globalStyles';
import {calculateDimension} from '../styles/helpers';
import PaymentDetailsTable from '../components/payments/PaymentDetailsTable';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';

export const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const defaults = {gross: 0, deposit: 0, amountDue: 0, isDepositPaid: false};
  const {clientEvent, setClientEvent, user} = useGlobalState();
  const webviewRef = useRef<any>();

  const commencePaymentJourney = async () => {
    if (!user.data || !clientEvent) {
      return;
    }
    const {clientToken} = await getFromBackend(
      '/api/events/payment-token',
      user.data?.jwt,
    );

    const depositAmount = clientEvent.deposit.toString();

    BraintreeDropIn.show({
      clientToken: clientToken,
      // merchantIdentifier: 'applePayMerchantIdentifier',
      // googlePayMerchantId: 'googlePayMerchantId',
      // countryCode: 'US', //apple pay setting
      // currencyCode: 'USD', //apple pay setting
      // merchantName: 'Your Merchant Name for Apple Pay',
      orderTotal: depositAmount,
      googlePay: false,
      applePay: false,
      vaultManager: false,
      payPal: true,
      cardDisabled: false,
      darkTheme: true,
      fontFamily: fontFam,
      boldFontFamily: fontFam,
    })
      .then(async (result: ClientTokenResult) => {
        if (!user.data) {
          console.error('ERROR: lost jwt');
          return;
        }
        const {nonce, deviceData} = result;
        const res = await postToBackend(
          '/api/events/payment-checkout',
          user.data.jwt,
          JSON.stringify({
            amount: depositAmount,
            payment_method_nonce: nonce,
            deviceData,
          }),
        );

        console.log('PAYMENT RES: ', res);
      })
      .catch(error => {
        if (error.code === 'USER_CANCELLATION') {
          // update your UI to handle cancellation
          console.log('User cancelled payment');
        } else {
          // update your UI to handle other errors
          console.log('Other error: ', error);
        }
      });
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      if (user.data !== null) {
        await retrieveClientEvent(user.data as any, setClientEvent);
        setRefreshing(false);
      }
    } catch (error) {
      console.log('error refreshing payment page');
      setRefreshing(false);
    }
  };

  const payments: Transaction[] =
    (clientEvent?.payments as Transaction[]) || [];

  const {gross, deposit, amountDue, isDepositPaid} =
    clientEvent !== null ? clientEvent : defaults;

  const hasFullyPaid: boolean = amountDue === 0;

  function sendDataToWebView() {
    if (webviewRef.current) {
      webviewRef.current.postMessage('A MESSAGE');
    }
  }
  useEffect(() => {
    sendDataToWebView();
  }, []);
  return (
    <SafeAreaView style={styles.blackBackground}>
      {hasFullyPaid ? (
        <FullyPaidBanner />
      ) : (
        <Button
          onPress={() => {
            // setLoading(true);
            // setWebviewOpen(true);
            commencePaymentJourney();
          }}
          title="Make a Payment"
        />
      )}
      {/* <View style={styles.tileContainer}>
        <PaymentTile label="Total Cost" amount={gross} />
        {isDepositPaid ? null : (
          <PaymentTile label="Deposit" amount={deposit} />
        )}
        {hasFullyPaid ? null : (
          <PaymentTile label="Amount Due" amount={amountDue} />
        )}
      </View> */}
      {clientEvent && (
        <PaymentDetailsTable
          paymentInfo={{
            amountDue: clientEvent.amountDue,
            deposit: clientEvent.deposit,
            isDepositPaid: clientEvent.isDepositPaid,
            gross: clientEvent.gross,
          }}
        />
      )}
      <Text style={styles.paymentHeader}>Your previous payments:</Text>

      {payments.length > 0 && (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <PreviousPayments payments={payments} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeWebviewContainer: {
    backgroundColor: colours.background,
    alignItems: 'flex-end',
  },
  closeButton: {
    flexDirection: 'row',
    backgroundColor: '#8c875f',
    borderRadius: 5,
    height: 30,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: colours.contrast,
    fontSize: fontSize.small,
    fontFamily: fontFam,
  },
  icon: {
    paddingLeft: 10,
  },
  webViewContainer: {
    height: '90%',
    width: '100%',
    backgroundColor: colours.background,
  },
  webView: {
    backgroundColor: colours.background,
    height: '100%',
    width: '100%',
  },
  container: {
    width: '100%',
    height: calculateDimension(0.5, 'height'),
  },
  tileContainer: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: colours.background,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  blackBackground: {
    height: calculateDimension(1, 'height'),
    backgroundColor: '#121212',
  },
  paymentHeader: {
    fontFamily: fontFam,
    fontSize: fontSize.medium,
    color: colours.contrast,
    paddingBottom: 10,
  },
  paymentButtonContainer: {
    height: '30%',
  },
});

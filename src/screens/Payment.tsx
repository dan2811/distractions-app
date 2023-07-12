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
import {retrieveClientEvent} from '../server/apiCalls';
import {useGlobalState} from '../state/initialState';
import {Transaction, ClientEvent, UserData} from '../types';
import {env} from '../../env';
import {updateClientEventWithPayment} from '../lib/payment';
import {Icon, Text} from 'react-native-elements';
import {colours, fontFam, fontSize} from '../styles/globalStyles';
import {calculateDimension} from '../styles/helpers';
import PaymentDetailsTable from '../components/payments/PaymentDetailsTable';

export const Payment = () => {
  const [webviewOpen, setWebviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [successData, setSuccessData] = useState('');
  const defaults = {gross: 0, deposit: 0, amountDue: 0, isDepositPaid: false};
  const {clientEvent, setClientEvent, user} = useGlobalState();
  const webviewRef = useRef<any>();

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
  if (webviewOpen) {
    return (
      <SafeAreaView style={styles.blackBackground}>
        <View style={styles.webViewContainer}>
          {loading && <LoadingSpinner text="Loading..." />}
          <View style={styles.closeWebviewContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setWebviewOpen(false);
              }}
              activeOpacity={0.7}>
              <Text style={styles.buttonText}>Close</Text>
              <Icon
                name="close"
                size={20}
                style={styles.icon}
                color={colours.contrast}
              />
            </TouchableOpacity>
          </View>
          <WebView
            onLoad={() => setLoading(false)}
            hideKeyboardAccessoryView={true}
            style={styles.webView}
            source={{uri: `${env.distradminUrl}/#/paypal`}}
            onMessage={data => {
              setSuccessData(data.nativeEvent.data);
              console.log(data.nativeEvent.data);
            }}
            onNavigationStateChange={async navState => {
              console.log(navState.url);
              if (navState.url.includes('paypalSuccess')) {
                console.log('REACHED HERE ON PAYPAL SUCCESS');
                console.log('SUCCESS PAYMENT DATA: ', JSON.parse(successData));
                try {
                  await updateClientEventWithPayment(
                    user.data?.jwt,
                    clientEvent,
                    JSON.parse(successData),
                  );
                } catch (e) {
                  console.log(e);
                }
                setWebviewOpen(false);
              }
              if (navState.url.includes('paypalCancel')) {
                setWebviewOpen(false);
              }
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.blackBackground}>
      {hasFullyPaid ? (
        <FullyPaidBanner />
      ) : (
        <Button
          onPress={() => {
            setLoading(true);
            setWebviewOpen(true);
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
  },
  tileContainer: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#000000',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  blackBackground: {
    height: calculateDimension(1, 'height'),
    backgroundColor: 'black',
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

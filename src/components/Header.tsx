import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useGlobalState} from '../state/initialState';
import {colours} from '../styles/globalStyles';
import {calculateDimension} from '../styles/helpers';

export const Header = () => {
  const {isSignedIn} = useGlobalState();

  const styles = StyleSheet.create({
    safeContainer: {
      height: calculateDimension(0.17, 'height'),
      backgroundColor: 'rgba(0,0,0,1)',
    },
    logoContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100%',
    },
    linearGradient: {
      height: calculateDimension(0.03, 'height'),
    },
    image: {
      width: isSignedIn ? '40%' : '50%',
      resizeMode: 'contain',
      alignSelf: 'center',
      height: '100%',
    },
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo_full_dark.png')}
          style={styles.image}
        />
      </View>
      {isSignedIn ? null : (
        <LinearGradient
          style={styles.linearGradient}
          colors={[colours.background, 'rgba(0,0,0,0.0)']}
          start={{x: 0.5, y: 0}}
        />
      )}
    </SafeAreaView>
  );
};

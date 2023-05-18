import React, {useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {colours, fontFam, fontSize} from '../styles/globalStyles';

const LoadingSpinner = ({text}: {text: string}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
      }).start();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}>
      <Text style={styles.loadingText}>{text}</Text>
      <ActivityIndicator
        color={colours.tint}
        style={styles.spinner}
        size="large"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.backgroundTransparent,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colours.tint,
    fontFamily: fontFam,
    fontSize: fontSize.small,
    alignSelf: 'center',
  },
  spinner: {
    backgroundColor: colours.background,
    paddingBottom: 200,
    paddingTop: 15,
  },
});
export default LoadingSpinner;

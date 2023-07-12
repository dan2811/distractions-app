import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  text: string;
}

export const TranslucentContainer = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.glassmorphism}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  glassmorphism: {
    width: '90%',
    height: 100,
    backgroundColor: 'rgba(244, 244, 244, 0.3)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(5px)',
  },
  text: {
    color: '#a8a17b',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

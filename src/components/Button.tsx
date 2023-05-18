import React from 'react';
import {GestureResponderEvent, Pressable, Text} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

export const Button = (props: {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  title: string;
}) => {
  const {onPress, title = 'Save'} = props;
  return (
    <Pressable style={globalStyles.button} onPress={onPress}>
      <Text style={globalStyles.buttonText}>{title}</Text>
    </Pressable>
  );
};

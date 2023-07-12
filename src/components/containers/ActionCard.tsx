import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colours, fontFam} from '../../styles/globalStyles';
import {NavigationWrapper} from '../NavigationWrapper';

interface ActionCardProps {
  actionText: string;
  dueDate: string;
  isComplete: boolean;
}

const ActionCard = ({actionText, dueDate, isComplete}: ActionCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.actionText]}>{actionText}</Text>
      <View>
        <Text style={styles.label}>Due:</Text>
        <Text style={[styles.text, styles.date]}>{dueDate}</Text>
      </View>
      {isComplete && (
        <Icon
          name="done"
          size={40}
          style={styles.tick}
          color={colours.positive}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: colours.tint,
    borderRadius: 40,
    minHeight: 100,
  },
  text: {
    fontFamily: fontFam,
    fontSize: 20,
    maxWidth: 200,
  },
  actionText: {
    color: colours.contrast,
  },
  date: {
    color: colours.tint,
  },
  label: {
    color: colours.tint,
  },
  tick: {
    color: colours.positive,
  },
  warning: {
    color: colours.warning,
  },
});

export default ActionCard;

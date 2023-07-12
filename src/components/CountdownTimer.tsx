import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {setTeaserText} from '../lib/teaserText';
import {colours, fontFam, fontWeight} from '../styles/globalStyles';

const CountdownTimer = ({date}: {date: number}) => {
  const [daysUntil, setDaysUntil] = useState(0);
  let teaserText = setTeaserText(daysUntil);
  useEffect(() => {
    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const timeDiff = parsedDate.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    setDaysUntil(days);
  }, [date]);

  return isNaN(date) ? (
    <View style={styles.timer}>
      <Text style={styles.errorText}>Something went wrong</Text>
    </View>
  ) : (
    <View style={styles.timer}>
      <Text style={styles.timerLabel}>{teaserText}</Text>
      <Text style={styles.timerText}>{daysUntil}</Text>
      <Text style={styles.timerLabel}>
        {daysUntil < 0
          ? 'DAYS SINCE YOUR EVENT'
          : daysUntil === 1
          ? 'DAY TO GO'
          : 'DAYS TO GO'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    borderRadius: 400,
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colours.tint,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colours.faded,
  },
  timerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colours.tint,
    marginTop: 8,
  },
  errorText: {
    fontFamily: fontFam,
    fontWeight: fontWeight.light,
    fontSize: 30,
    color: colours.warning,
  },
});

export default CountdownTimer;

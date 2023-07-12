import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {setTeaserText} from '../lib/teaserText';

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
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.timerLabel}>Something went wrong</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.timerLabel}>{teaserText}</Text>
        <Text style={styles.timerText}>{daysUntil}</Text>
        <Text style={styles.timerLabel}>
          {daysUntil < 0
            ? 'DAYS SINCE YOUR EVENT'
            : daysUntil === 1
            ? 'DAY REMAINING'
            : 'DAYS REMAINING'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    borderRadius: 0,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#a79f7c',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#a79f7c',
  },
  timerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a79f7c',
    marginTop: 8,
  },
});

export default CountdownTimer;

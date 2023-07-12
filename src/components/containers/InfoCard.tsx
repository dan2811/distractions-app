import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {colours, fontFam, fontSize} from '../../styles/globalStyles';
import LoadingSpinner from '../LoadingSpinner';

interface InfoCardProps {
  text?: string;
  label?: string;
  input?: React.ReactNode;
  loading: boolean;
}

const InfoCard = ({text, label, input, loading}: InfoCardProps) => {
  if (loading) {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <LoadingSpinner text="Saving..." />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        {text && <Text style={[styles.text]}>{text}</Text>}
      </View>
      {input && <View>{input}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '90%',
    borderWidth: 1,
    borderColor: colours.tint,
    borderRadius: 40,
    minHeight: 100,
    padding: 20,
    margin: '5%',
  },
  text: {
    color: colours.tint,
    fontFamily: fontFam,
    fontSize: 20,
    maxWidth: 200,
  },
  label: {
    fontFamily: fontFam,
    fontSize: fontSize.small,
    color: colours.faded,
    paddingBottom: 6,
  },
});

export default InfoCard;

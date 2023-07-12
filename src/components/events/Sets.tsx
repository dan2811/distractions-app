import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colours, fontFam, fontSize} from '../../styles/globalStyles';
import {Sets} from '../../types';
import {parseTime} from '../../lib/dateTimeUtils';

interface SetsProps {
  data: Sets[];
  handleRefreshSets: () => void;
  refreshing: boolean;
  setEditSet: (input: Sets) => void;
}

export const SetList = ({
  data,
  handleRefreshSets,
  refreshing,
  setEditSet,
}: SetsProps) => {
  const [truncatedNotes, setTruncatedNotes] = useState<number[]>(
    data.map((set, idx) => idx),
  );

  const handleEditSet = (input: any) => {
    console.log('editing set', input);
  };

  return (
    <FlatList
      style={styles.flatList}
      data={data}
      onRefresh={handleRefreshSets}
      refreshing={refreshing}
      renderItem={({item, index}) => {
        return (
          <View style={styles.set}>
            <View style={styles.setHeaderContainer}>
              <Text style={styles.text}>{item.name}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setEditSet(item)}
                activeOpacity={0.7}>
                <Text style={styles.buttonText}>Edit</Text>
                <Icon
                  name="music-note"
                  size={20}
                  style={styles.icon}
                  color={colours.contrast}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.listText}>
              {parseTime(item.start)} - {parseTime(item.end)}
            </Text>
            <View>
              <Text
                style={styles.clientNotesText}
                numberOfLines={truncatedNotes.includes(index) ? 1 : 999}>
                Notes: {item.notesFromClient}
              </Text>
              <TouchableOpacity
                style={styles.notesButton}
                onPress={() => {
                  if (truncatedNotes.includes(index)) {
                    const truncatedNotesWithCurrentIndexRemoved =
                      truncatedNotes.filter(setNum => setNum !== index);
                    setTruncatedNotes(truncatedNotesWithCurrentIndexRemoved);
                  } else {
                    setTruncatedNotes([...truncatedNotes, index]);
                  }
                }}
                activeOpacity={0.7}>
                <Text style={styles.notesButtonText}>
                  {truncatedNotes.includes(index) ? 'Show more' : 'Show less'}
                </Text>
                <Icon
                  name={
                    truncatedNotes.includes(index)
                      ? 'arrow-drop-down'
                      : 'arrow-drop-up'
                  }
                  size={20}
                  color={colours.faded}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    backgroundColor: colours.background,
  },
  mainDetails: {
    height: '10%',
    width: '100%',
    margin: '5%',
  },
  flatList: {
    width: '90%',
    margin: '5%',
  },
  setHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  set: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colours.tint,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colours.tint,
    borderRadius: 5,
    height: 'auto',
    width: 'auto',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colours.background,
    fontSize: fontSize.small,
    fontFamily: fontFam,
  },
  icon: {
    paddingLeft: 10,
  },
  text: {
    color: colours.faded,
    fontFamily: fontFam,
    fontSize: fontSize.medium,
  },
  listText: {
    color: colours.tint,
    fontFamily: fontFam,
    fontSize: fontSize.small,
  },
  clientNotesText: {
    color: colours.tint,
    fontFamily: fontFam,
    fontSize: fontSize.small,
    paddingTop: 10,
  },
  notesButtonText: {
    color: colours.faded,
    fontFamily: fontFam,
    fontSize: fontSize.small,
  },
  notesButton: {
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 5,
  },
});

import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colours, fontFam, fontSize} from '../styles/globalStyles';
import {Sets} from '../types';

interface SetsProps {
  data: Sets[];
  handleRefreshSets: () => void;
  refreshing: boolean;
  handleEditSet: (input: Sets) => void;
}

export const SetList = ({
  data,
  handleRefreshSets,
  refreshing,
  handleEditSet,
}: SetsProps) => {
  const [truncatedNotes, setTruncatedNotes] = useState<number[]>(
    data.map((set, idx) => idx),
  );
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      onRefresh={handleRefreshSets}
      refreshing={refreshing}
      renderItem={({item, index}) => {
        return (
          <View style={styles.setContainer}>
            <View style={styles.set}>
              <View style={styles.setHeaderContainer}>
                <Text style={styles.text}>
                  Set {index + 1}: {item.name}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleEditSet(item)}
                  activeOpacity={0.7}>
                  <Text style={styles.buttonText}>Songs</Text>
                  <Icon
                    name="music-note"
                    size={20}
                    style={styles.icon}
                    color={colours.contrast}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.listText}>Start time: {item.start}</Text>
              <Text style={styles.listText}>End time: {item.end}</Text>
              {item.notesFromClient === null ? null : (
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
                        setTruncatedNotes(
                          truncatedNotesWithCurrentIndexRemoved,
                        );
                      } else {
                        setTruncatedNotes([...truncatedNotes, index]);
                      }
                    }}
                    activeOpacity={0.7}>
                    <Text style={styles.notesButtonText}>
                      {truncatedNotes.includes(index)
                        ? 'Show more'
                        : 'Show less'}
                    </Text>
                    <Icon
                      name={
                        truncatedNotes.includes(index)
                          ? 'arrow-drop-down'
                          : 'arrow-drop-up'
                      }
                      size={20}
                      color={colours.tint}
                    />
                  </TouchableOpacity>
                </View>
              )}
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
    height: '92%',
    width: '100%',
    backgroundColor: '#000000',
  },
  mainDetails: {
    height: '10%',
    width: '90%',
    margin: '5%',
  },
  flatList: {
    width: '90%',
    margin: '5%',
  },
  setContainer: {
    width: '100%',
  },
  setHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  set: {
    width: '100%',
    borderWidth: 2,
    borderColor: colours.tint,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#8c875f',
    borderRadius: 5,
    height: 'auto',
    width: 'auto',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1F1F1F',
    fontSize: fontSize.small,
    fontFamily: fontFam,
  },
  icon: {
    paddingLeft: 10,
  },
  text: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.medium,
  },
  listText: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.small,
  },
  clientNotesText: {
    color: colours.contrast,
    fontFamily: fontFam,
    fontSize: fontSize.small,
    paddingTop: 10,
  },
  notesButtonText: {
    color: colours.tint,
    fontFamily: fontFam,
    fontSize: fontSize.small,
  },
  notesButton: {
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 5,
  },
});

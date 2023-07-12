import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-elements';
import {ChatRoom, User} from '../../types';
import {
  colours,
  fontFam,
  fontSize,
  fontWeight,
} from '../../styles/globalStyles';
import {
  formatLastUpdated,
  getNewestMessage,
  sortRoomsByNewestMessage,
} from '../../lib/dateUtils';
import {ImmutableObject} from '@hookstate/core';
import {UnreadMessageCounter} from './UnreadMessageCounter';
import {getUnreadMessages} from '../../lib/chatHelpers';
import {calculateDimension} from '../../styles/helpers';

interface ChatRoomListProps {
  rooms: ChatRoom[];
  setSelected: (input: number) => void;
  refresh: () => void;
  refreshing: boolean;
  currentUser: ImmutableObject<ImmutableObject<User>>;
}

const ChatRoomList = ({
  rooms,
  setSelected,
  refresh,
  refreshing,
  currentUser,
}: ChatRoomListProps) => {
  if (!currentUser.data) {
    console.error('NO USER');
    return <></>;
  }

  const userId = currentUser.data.user.id;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.chatRoomListHeader}>
        <Text style={styles.chatRoomListHeaderText}>Chats</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        onRefresh={refresh}
        refreshing={refreshing}
        data={sortRoomsByNewestMessage(rooms)}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={() => setSelected(item.id)}>
            <View style={styles.listItemContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.chatRoomName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.lastUpdateTime} numberOfLines={1}>
                  {formatLastUpdated(
                    getNewestMessage(item.messages)?.createdAt,
                  )}
                </Text>
              </View>
              <View style={styles.rightContainer}>
                <UnreadMessageCounter
                  count={getUnreadMessages(item.messages, userId).length}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: colours.tint,
  },
  listItemContainer: {
    height: 70,
    width: '100%',
    backgroundColor: colours.background,
    justifyContent: 'center',
    borderBottomColor: colours.tint,
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    paddingLeft: '5%',
  },
  leftContainer: {
    width: '90%',
    justifyContent: 'center',
  },
  rightContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatRoomListHeader: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatRoomListHeaderText: {
    fontFamily: fontFam,
    color: colours.contrast,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.large,
  },
  chatRoomName: {
    color: colours.tint,
    fontFamily: fontFam,
    fontWeight: fontWeight.light,
    fontSize: fontSize.small,
    flexWrap: 'nowrap',
  },
  lastUpdateTime: {
    fontFamily: fontFam,
    color: colours.faded,
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  mainContainer: {
    height: calculateDimension(0.9, 'height'),
    justifyContent: 'center',
    backgroundColor: colours.background,
  },
});

export default ChatRoomList;

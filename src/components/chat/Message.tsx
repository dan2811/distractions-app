import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {useGlobalState} from '../../state/initialState';
import {colours, fontFam, fontSize, fontWeight} from '../../styles/globalStyles';
import {TMessage} from '../../types';
import {formatLastUpdated} from '../../logic/dateUtils';

interface MessageProps {
  message: TMessage;
}

const Message = ({message}: MessageProps) => {
  const {user} = useGlobalState();
  const {content, sender, createdAt} = message;
  const isSenderMe = sender.id === user.data?.user.id;

  return isSenderMe ? (
    <View style={[styles.myMessageContainer, styles.default]}>
      <Text style={styles.messageText} numberOfLines={999}>
        {content}
      </Text>
      <Text style={styles.sentTime} numberOfLines={999}>
        {formatLastUpdated(createdAt)}
      </Text>
    </View>
  ) : (
    <View style={[styles.otherMessageContainer, styles.default]}>
      <Text style={styles.sender} numberOfLines={999}>
        {sender.email}
      </Text>
      <Text style={styles.messageText} numberOfLines={999}>
        {content}
      </Text>
      <Text style={styles.sentTime} numberOfLines={999}>
        {formatLastUpdated(createdAt)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    width: '60%',
    marginBottom: 10,
    borderRadius: 10,
    padding: 8,
    transform: [{scaleY: -1}],
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colours.faded,
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colours.tint,
  },
  messageText: {
    fontFamily: fontFam,
    fontSize: fontSize.small,
    fontWeight: fontWeight.light,
  },
  sender: {
    paddingBottom: 5,
    fontFamily: fontFam,
  },
  sentTime: {
    fontFamily: fontFam,
    paddingTop: 5,
    alignSelf: 'flex-end',
  },
});

export default Message;

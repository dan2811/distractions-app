import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {TMessage} from '../../types';
import Message from './Message';
import {sortByAscendingDate} from '../../lib/dateUtils';

const Messages = ({messages}: {messages: TMessage[]}) => {
  return (
    <ScrollView style={styles.messagesContainer}>
      {sortByAscendingDate(messages, 'createdAt').map(message => (
        <Message
          message={message}
          key={`${message.id}-${message.sender}-${message.createdAt}`}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    width: '100%',
    flexDirection: 'column',
    transform: [{scaleY: -1}],
    marginBottom: 10,
  },
});

export default Messages;

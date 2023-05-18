import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {
  colours,
  fontFam,
  fontSize,
  fontWeight,
} from '../../styles/globalStyles';
import BackButton from '../BackButton';
import {Icon, Text} from 'react-native-elements';
import {ChatRoom} from '../../types';
import Messages from './Messages';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useGlobalState} from '../../state/initialState';
import {SocketContext} from '../../server/socket';
import {getUnreadMessages} from '../../logic/chatHelpers';
import {calculateDimension} from '../../styles/helpers';

interface ChatProps {
  setSelectedRoom: (input: number) => void;
  chatroom: ChatRoom;
}

const Chat = ({setSelectedRoom, chatroom}: ChatProps) => {
  const [message, setMessage] = useState<string>('');
  const socket = useContext(SocketContext);

  const {user} = useGlobalState();

  const sendMessage = () => {
    socket.emit('clientMessage', {user, message, roomId: chatroom.id});
    setMessage('');
  };

  useEffect(() => {
    if (!user.data) {
      return;
    }
    const userId = user.data.user.id;
    const unreadMessages = getUnreadMessages(
      chatroom.messages,
      user.data.user.id,
    );

    if (unreadMessages.length > 0) {
      unreadMessages.forEach(currentMessage => {
        socket.emit('messageRead', {
          userId,
          messageId: currentMessage.id,
        });
      });
    }
  }, []);

  return (
    <KeyboardAwareScrollView
      extraHeight={calculateDimension(0.3, 'height')}
      style={{backgroundColor: colours.background}}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      contentOffset={{x: 0, y: 350}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.headerContainer}>
        <BackButton setSelectedRoom={setSelectedRoom} />
        <Text numberOfLines={1} style={styles.chatRoomTitle}>
          {chatroom.name}
        </Text>
      </View>
      <Messages messages={chatroom.messages} />
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setMessage}
          value={message}
          style={styles.messageInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon name="send" color={colours.tint} size={30} />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '94%',
    backgroundColor: colours.background,
  },
  text: {
    color: 'white',
  },
  messageInput: {
    width: '80%',
    backgroundColor: colours.contrast,
    color: colours.background,
    padding: '2%',
    borderRadius: 10,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    paddingLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  chatRoomTitle: {
    fontFamily: fontFam,
    color: colours.contrast,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.large,
  },
});

export default Chat;

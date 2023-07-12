import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useGlobalState} from '../state/initialState';
import ChatRoomList from '../components/chat/ChatRoomList';
import {ChatRoom} from '../types';
import Chat from '../components/chat/Chat';
import {getFromBackend} from '../server/apiCalls';
import LoadingSpinner from '../components/LoadingSpinner';
import {SocketContext} from '../server/socket';
import {Alert} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colours, fontFam, fontSize} from '../styles/globalStyles';
import {Linking} from 'react-native';

export const Contact = () => {
  const [selectedRoom, setSelectedRoom] = useState<number>(-1);
  const [chatData, setChatData] = useState<ChatRoom[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const chatDataRef = useRef<ChatRoom[]>([]);

  const socket = useContext(SocketContext);

  const {user} = useGlobalState();

  const retrieveMessages = useCallback(async () => {
    if (user.data?.jwt) {
      try {
        setRefreshing(true);
        const result: ChatRoom[] = await getFromBackend(
          '/api/chats/mine',
          user.data?.jwt,
        );
        setChatData(result);
        setRefreshing(false);
        return result;
      } catch (error) {
        setRefreshing(false);
        console.error('Error getting chats from server: ', error);
      }
    }
  }, [user.data?.jwt]);

  useEffect(() => {
    if (chatData === undefined) {
      Alert.alert('Could not get chat data');
      return;
    } else {
      chatData.forEach(room => {
        console.log('JOINING ROOM - ', room.id);
        socket.emit('join', {user: user.data?.user.email, roomId: room.id});
        socket.on('newMessage', data => {
          console.log(`NEW MESSAGE: ${data}`);
          retrieveMessages();
        });
      });

      return () => {
        chatData.forEach(room => {
          // before the component is destroyed
          // unbind all event handlers used in this component
          socket.off(`room-${room.id}`);
        });
      };
    }
  }, [chatData, retrieveMessages, socket, user.data?.user.email]);

  useEffect(() => {
    const fetchChatData = async () => {
      const data = await retrieveMessages();
      if (data) {
        chatDataRef.current = data;
        setChatData(data);
      } else {
        console.error('Problem getting chats from server');
      }
    };
    fetchChatData();
  }, []);

  if (!chatData) {
    return <LoadingSpinner text="Loading messages..." />;
  }

  if (!user) {
    return <LoadingSpinner text="Loading..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {selectedRoom >= 0 ? (
        <Chat
          setSelectedRoom={setSelectedRoom}
          chatroom={chatData.filter(room => room.id === selectedRoom)[0]}
        />
      ) : chatData.length ? (
        <ChatRoomList
          rooms={chatData}
          setSelected={setSelectedRoom}
          refresh={retrieveMessages}
          refreshing={refreshing}
          currentUser={user}
        />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              try {
                Linking.openURL('tel:0115 666 8276');
              } catch (e) {
                console.error('COULD NOT OPEN PHONE: ', e);
              }
            }}>
            <Text style={styles.text}>
              <Icon name="call" color={colours.faded} size={fontSize.large} />{' '}
              0115 666 8276
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.background,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    fontFamily: fontFam,
    fontSize: fontSize.large,
    color: colours.faded,
    textAlign: 'center',
  },
});

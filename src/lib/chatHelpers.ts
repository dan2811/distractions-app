import { Alert } from 'react-native';
import { getFromBackend } from '../server/apiCalls';
import { TMessage } from '../types';

export const getUnreadMessages = async (
  jwt: string | undefined,
  messages: TMessage[],
): Promise<TMessage[]> => {
  if (!jwt) {
    Alert.alert('Unexpected problem, please restart the app.');
    throw new Error('Missing access token');
  }
  if (!messages.length) {
    return [];
  }
  const chatId = messages[0].chat.id;
  const endpoint = `/api/chats/unread/${chatId}`;
  const unreadMessages = await getFromBackend(endpoint, jwt);

  return unreadMessages;
};

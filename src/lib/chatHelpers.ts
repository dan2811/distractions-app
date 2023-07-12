import {TMessage} from '../types';
import {sortByAscendingDate} from './dateUtils';

export const getUnreadMessages = (
  messages: TMessage[],
  currentUserId: number,
): TMessage[] => {
  console.log('ALL MESSAGES IN THIS CHAT: ', messages.length);
  if (!messages.length) {
    return [];
  }

  const messagesFromOtherUsers = messages.filter(
    message => message.sender.id !== currentUserId,
  );

  console.log('MESSAGES FROM OTHER USERS: ', messagesFromOtherUsers.length);

  if (!messagesFromOtherUsers) {
    return [];
  }
  //First message in the following array is the most recent
  const sortedMessages = sortByAscendingDate<TMessage, 'createdAt'>(
    messagesFromOtherUsers,
    'createdAt',
  );

  let unreadMessages = [] as TMessage[];
  for (let i = 0; i < sortedMessages.length; i++) {
    const usersThatHaveReadCurrentMessage = sortedMessages[i].hasRead as any;
    if (!usersThatHaveReadCurrentMessage) {
      unreadMessages.push(sortedMessages[i]);
      continue;
    }
    const userHasReadMessage = usersThatHaveReadCurrentMessage.find(
      (user: any) => user.id === currentUserId,
    );
    if (!userHasReadMessage) {
      unreadMessages.push(sortedMessages[i]);
      continue;
    } else {
      break;
    }
  }

  console.log('UNREAD MESSAGES', unreadMessages.length);
  return unreadMessages;
};

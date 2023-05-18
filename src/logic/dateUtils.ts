import {ChatRoom, TMessage} from '../types';

export const formatLastUpdated = (dateTime: string): string => {
  if (!dateTime) {
    return '';
  }
  const date = new Date(dateTime);
  if (date.getDate() === new Date().getDate()) {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return date.toLocaleString('en-GB', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getNewestMessage = (messages: TMessage[]): TMessage => {
  if (!messages.length) {
    return {createdAt: ''} as TMessage;
  }
  const sortedMessages = messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return sortedMessages[0];
};

export const sortByAscendingDate = <
  T extends Record<string, any>,
  K extends keyof T,
>(
  array: T[],
  field: K,
  nestedField: string = '',
): T[] => {
  if (!nestedField) {
    return array.sort(
      (a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime(),
    );
  }
  return array.sort(
    (a, b) =>
      new Date(b[field][nestedField]).getTime() -
      new Date(a[field][nestedField]).getTime(),
  );
};

export const sortRoomsByNewestMessage = (rooms: ChatRoom[]): ChatRoom[] => {
  const roomToMostRecentMessageMap = rooms.map(room => ({
    room,
    newestMessage: getNewestMessage(room.messages),
  }));

  const sortedRoomMaps = sortByAscendingDate(
    roomToMostRecentMessageMap,
    'newestMessage',
    'createdAt',
  );

  const sortedRooms = sortedRoomMaps.map(map => map.room);

  return sortedRooms;
};

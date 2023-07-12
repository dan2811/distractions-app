import {ChatRoom} from '../../types';
import {sortRoomsByNewestMessage} from '../dateTimeUtils';

describe('dateUtils', () => {
  describe('sortRooms', () => {
    const unsortedChatrooms = [
      {
        id: 1,
        messages: [
          {
            id: 1,
            createdAt: '',
            updatedAt: '',
          },
        ],
      },
      {
        id: 2,
        messages: [
          {
            id: 1,
            createdAt: '',
            updatedAt: '',
          },
        ],
      },
      {
        id: 3,
        messages: [
          {
            id: 1,
            createdAt: '',
            updatedAt: '',
          },
        ],
      },
      {
        id: 4,
        messages: [
          {
            id: 1,
            createdAt: '',
            updatedAt: '',
          },
        ],
      },
    ] as ChatRoom[];

    const unsortedRooms = [
      {
        id: 1,
        messages: [
          {
            chat: {
              id: 1,
            },
            id: 74,
            content: 'Should be 1st',
            createdAt: '2023-04-19T09:35:47.167Z',
            updatedAt: '2023-04-19T13:46:17.897Z',
          },
          {
            chat: {
              id: 1,
            },
            id: 74,
            content: 'Should not be seen',
            createdAt: '2023-04-18T09:35:47.167Z',
            updatedAt: '2023-04-19T13:46:17.897Z',
          },
        ],
      },
      {
        id: 2,
        messages: [
          {
            chat: {
              id: 2,
            },
            id: 1,
            content: 'Should be last',
            createdAt: '2022-01-17T09:35:47.167Z',
            updatedAt: '2023-04-19T13:46:17.897Z',
          },
          {
            chat: {
              id: 2,
            },
            id: 2,
            content: 'Should not be seen',
            createdAt: '2021-04-15T10:35:47.167Z',
            updatedAt: '2023-04-19T13:46:17.897Z',
          },
        ],
      },
      {
        id: 3,
        messages: [
          {
            chat: {
              id: 3,
            },
            id: 3,
            content: 'Should be 2nd',
            createdAt: '2023-04-15T09:35:47.167Z',
            updatedAt: '2023-04-19T13:46:17.897Z',
          },
          {
            chat: {
              id: 3,
            },
            id: 4,
            content: 'Test3',
            createdAt: '2023-04-14T09:35:47.167Z',
            updatedAt: '2023-04-19T13:46:17.897Z',
          },
        ],
      },
      {
        id: 4,
        messages: [
          {
            chat: {
              id: 4,
            },
            id: 5,
            content: 'Test3',
            createdAt: '2023-04-15T09:35:44.167Z',
            updatedAt: '2023-04-19T13:46:17.897Z',
          },
          {
            chat: {
              id: 4,
            },
            id: 6,
            content: 'Should be 3rd',
            createdAt: '2023-04-16T09:35:47.167Z',
            updatedAt: '2023-04-19T13:46:17.897Z',
          },
        ],
      },
    ] as ChatRoom[];

    it('returns a correctly sorted list of rooms', () => {
      const result = sortRoomsByNewestMessage(unsortedRooms);
      console.log('RESULT: ', result);
      // expect(result).toBe(sortedChatrooms);
    });

    it('Works even if a chat has no messages', () => {});
  });
});

import {TMessage} from '../../types';
import {getUnreadMessages} from '../chatHelpers';

describe('chatHelpers', () => {
  describe('getUnreadMessages', () => {
    it('handles if no-one has read the message', () => {
      const mockMessages = [
        {id: 1, sender: {id: 2}, hasRead: []},
        {id: 2, sender: {id: 3}, hasRead: []},
      ] as any;

      const result = getUnreadMessages(mockMessages, 1);
      expect(result).toStrictEqual([
        {id: 1, sender: {id: 2}, hasRead: []},
        {id: 2, sender: {id: 3}, hasRead: []},
      ]);
    });
    it('handles if everyone has read the message', () => {
      const mockMessages = [
        {
          id: 1,
          sender: {id: 1},
          hasRead: [{id: 1}, {id: 2}],
        },
      ] as any;
      const result = getUnreadMessages(mockMessages, 1);
      expect(result).toStrictEqual([]);
    });
    it('handles a case where there are no messages', () => {
      const result = getUnreadMessages([], 1);
      expect(result).toStrictEqual([]);
    });
    it('handles a case where there are only messages sent by the current user', () => {
      const mockMessages = [{sender: {id: 1}}, {sender: {id: 1}}] as TMessage[];
      const result = getUnreadMessages(mockMessages, 1);
      expect(result).toStrictEqual([]);
    });
  });
});

export interface User {
  isSignedIn: boolean;
  data: UserData | null;
  chatRooms: ChatRoom[];
}

export interface UserData {
  jwt: string;
  user: {
    id: number;
    email: string;
    role: Role;
    chats: ChatRoom[];
    confirmed: boolean;
    blocked: boolean;
    provider: string;
  };
}

// const thing = {
//   blocked: false,
//   confirmed: true,
//   createdAt: '2023-03-23T19:17:36.779Z',
//   email: 'test@test.com',
//   fName: null,
//   id: 24,
//   lName: null,
//   messages: [
//     {
//       content: 'Sending a message',
//       createdAt: '2023-04-18T15:33:51.417Z',
//       id: 120,
//       updatedAt: '2023-05-17T21:47:05.675Z',
//     },
//   ],
//   provider: 'local',
//   role: {
//     createdAt: '2023-02-12T20:13:49.350Z',
//     description: 'client',
//     id: 3,
//     name: 'client',
//     type: 'superadmin',
//     updatedAt: '2023-04-13T18:47:04.718Z',
//   },
//   updatedAt: '2023-03-23T19:17:36.779Z',
//   username: 'test@test.com',
// };

interface Role {
  id: number;
  name: string;
  description: string;
}

type ISODateString = string;

export interface ClientEvent {
  id: number;
  date: string;
  location: string;
  gross: number;
  deposit: number;
  amountDue: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  team: string;
  isDepositPaid: boolean;
  payments: Transaction[];
  clientCanEdit: boolean;
  notesFromClient: string;
  package: Package;
  sets: Sets[];
}

export interface EventPaymentInfo
  extends Pick<
    ClientEvent,
    'isDepositPaid' | 'amountDue' | 'deposit' | 'gross'
  > {}

export interface Sets {
  id: number;
  name: string;
  start: string;
  end: string;
  songs: Song[];
  notesFromClient: string;
}

export interface Song {
  id: number;
  name: string;
  artist: string;
}

export interface Package {
  id: number;
  name: string;
}

export interface Transaction {
  id: number;
  amount: number;
  date: string;
}

export interface ChatRoom {
  id: number;
  name: string;
  isClientChat: boolean;
  createdAt: string;
  updatedAt: string;
  messages: TMessage[];
}

export interface TMessage {
  content: string;
  createdAt: string;
  id: number;
  sender: Sender;
  updatedAt: string;
  chat: ChatRoom;
  hasRead: UserData[];
}

export interface Sender {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  username: string;
}

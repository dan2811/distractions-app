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

export type ScreenName = 'Home' | 'Event' | 'Payment' | 'Contact';

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
  depositDueDate: string;
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

//PAYMENTS
export interface ClientTokenResult {
  description: string;
  deviceData: JSON;
  isDefault: boolean;
  nonce: string;
  type: string;
}

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  status: string;
  method: string;
}

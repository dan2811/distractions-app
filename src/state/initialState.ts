import {hookstate, useHookstate} from '@hookstate/core';
import {ChatRoom, ClientEvent, User, UserData} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InitialState {
  user: User;
  event: ClientEvent | null;
  app: {
    activeScreen: string;
    displayNavBar: boolean;
  };
}

export const initialState: InitialState = {
  user: {
    isSignedIn: false,
    data: null,
    chatRooms: [],
  },
  event: null,
  app: {
    activeScreen: 'Home',
    displayNavBar: true,
  },
};

const globalState = hookstate(initialState);

export function useGlobalState() {
  const state = useHookstate(globalState);
  return {
    get isSignedIn() {
      return state.user.isSignedIn.get();
    },
    setIsSignedIn(status: boolean) {
      AsyncStorage.setItem('isLoggedIn', status.toString());
      state.user.isSignedIn.set(status);
    },
    get user() {
      return state.user.get();
    },
    setUserData(data: UserData) {
      state.user.data.set(data);
    },
    get clientEvent() {
      return state.event.get();
    },
    setClientEvent(eventData: ClientEvent) {
      state.event.set(eventData);
    },
    get activeScreen() {
      return state.app.activeScreen.get();
    },
    setActiveScreen(newScreen: string) {
      state.app.activeScreen.set(newScreen);
    },
    get displayNavBar() {
      return state.app.displayNavBar.get();
    },
    setDisplayNavBar(option: boolean) {
      state.app.displayNavBar.set(option);
    },
    get chatRooms() {
      return state.user.chatRooms.get();
    },
    setChatRooms(data: ChatRoom[]) {
      state.user.chatRooms.set(data);
    },
  };
}

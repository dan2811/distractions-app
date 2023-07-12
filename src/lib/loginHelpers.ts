import AsyncStorage from '@react-native-async-storage/async-storage';
import {env} from '../../env';
import {UserData} from '../types';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${env.backendUrl}/api/auth/local?populate=*`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  });

  const data: UserData = await response.json();

  AsyncStorage.setItem('userData', JSON.stringify(data));

  return data;
};

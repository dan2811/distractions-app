import {env} from '../../env';
import {ClientEvent, UserData} from '../types';

export const retrieveClientEvent = async (
  {jwt}: UserData,
  setClientEvent: (input: ClientEvent) => void,
) => {
  try {
    const endpoint = '/api/events/mine';
    const data = (await getFromBackend(endpoint, jwt)) as ClientEvent;
    setClientEvent(data);
    console.log('retrieved the following client event: ', data);
  } catch (err) {
    console.log(err);
  }
};

export const getFromBackend = async (endpoint: string, jwt: string) => {
  const response = await fetch(`${env.backendUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.json();
};

export const postToBackend = async (
  endpoint: string,
  jwt: string,
  data: any,
) => {
  const response = await fetch(`${env.backendUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: data,
  });
  console.log('postToBackend response', response);
  return response.json();
};

export const putToBackend = async (
  endpoint: string,
  jwt: string,
  data: any,
) => {
  const response = await fetch(`${env.backendUrl}${endpoint}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: data,
  });
  console.log('putToBackend response', response);
  return response;
};

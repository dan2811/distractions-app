import {postToBackend} from '../server/apiCalls';

export const updateClientEventWithPayment = async (
  jwt: unknown,
  clientEvent: any,
  paypalData: any,
) => {
  if (!jwt) {
    return Error('No jwt!');
  }
  if (typeof jwt !== 'string') {
    return Error(
      `invalid format for jwt, format should be string, format is actually: ${typeof jwt}`,
    );
  }
  const endpoint = '/api/events/update-payment';
  const body = {paypalData, clientEvent};
  console.log('BODY BEFORE BEING STRINGIFIED', body);
  await postToBackend(endpoint, jwt, body);
};

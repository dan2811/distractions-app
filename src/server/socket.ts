import * as io from 'socket.io-client';
import {env} from '../../env';
import React from 'react';

export const socket = io.connect(env.backendUrl);
export const SocketContext = React.createContext(socket);

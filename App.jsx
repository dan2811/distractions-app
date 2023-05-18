import * as React from 'react';
import {Main} from './src/screens/Main';
import OneSignal from 'react-native-onesignal';
import {env} from './env';
import {globalStyles} from './src/styles/globalStyles';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import {SocketContext, socket} from './src/server/socket';

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  OneSignal.setAppId(env.oneSignalAppId);
  OneSignal.promptForPushNotificationsWithUserResponse();

  return (
    <SocketContext.Provider value={socket}>
      <StatusBar barStyle="light-content" />
      <Main style={globalStyles.main} />
    </SocketContext.Provider>
  );
}

export default App;

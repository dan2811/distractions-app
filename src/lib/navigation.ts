import {CommonActions} from '@react-navigation/native';
import {ScreenName} from '../types';

export const handleNavigation = (
  setActiveScreen: (input: ScreenName) => void,
  navigation: any,
  currentScreen: ScreenName,
  newScreen: ScreenName,
) => {
  console.debug(`Navigating from ${currentScreen} to ${newScreen}`);
  setActiveScreen(newScreen);
  navigation.dispatch(
    CommonActions.navigate({
      name: newScreen,
    }),
  );
};

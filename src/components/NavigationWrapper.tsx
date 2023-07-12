import React from 'react';
import {TouchableOpacity} from 'react-native';
import {handleNavigation} from '../lib/navigation';
import {useGlobalState} from '../state/initialState';
import {useNavigation} from '@react-navigation/native';

export const NavigationWrapper = (props: any) => {
  const navigation = useNavigation();
  const {setActiveScreen, activeScreen} = useGlobalState();
  return (
    <TouchableOpacity
      {...props}
      onPress={() =>
        handleNavigation(
          setActiveScreen,
          navigation,
          activeScreen,
          props.navigateTo,
        )
      }>
      {props.children}
    </TouchableOpacity>
  );
};

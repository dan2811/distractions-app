import {StyleSheet} from 'react-native';

export const fontSize = {
  small: 17,
  smallToMedium: 20,
  medium: 24,
  large: 32,
};

export const fontWeight = {
  light: '300',
  medium: '600',
  heavy: '900',
} as const;

export const colours = {
  tint: '#a8a17b',
  background: '#121212',
  backgroundTransparent: 'rgba(0, 0, 0, 0.85)',
  contrast: 'white',
  faded: 'lightgrey',
  warning: 'red',
  positive: 'green',
};

export const fontFam = 'Futura';

export const globalStyles = StyleSheet.create({
  main: {
    backgroundColor: '#121212',
  },
  loginContainer: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '10%',
  },
  input: {
    fontFamily: fontFam,
    fontWeight: fontWeight.medium,
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },

  button: {
    alignSelf: 'center',
    width: '80%',
    height: '7%',
    backgroundColor: '#a8a17b',
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontFamily: fontFam,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.medium,
  },
});

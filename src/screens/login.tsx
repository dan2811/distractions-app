/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import {useGlobalState} from '../state/initialState';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colours, fontFam} from '../styles/globalStyles';
import LoadingSpinner from '../components/LoadingSpinner';
import {login} from '../logic/loginHelpers';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedInput, setSelectedInput] = useState<string | null>(null);
  const {setIsSignedIn, setUserData} = useGlobalState();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await login(email, password);
      setUserData(data);
      setIsSignedIn(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('Error during login: ', e);
      Alert.alert('Please check your credentials and try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/horn-player.png')}
      style={styles.background}>
      {loading ? (
        <LoadingSpinner text="" />
      ) : (
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          keyboardOpeningTime={0}
          contentContainerStyle={styles.container}
          extraHeight={300}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#8c875f'}
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      selectedInput === 'email'
                        ? 'rgb(0, 0, 0)'
                        : 'rgba(21, 21, 21, 0.85)',
                  },
                ]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setSelectedInput('email')}
                onBlur={() => setSelectedInput(null)}
              />
              <TextInput
                placeholderTextColor={'#8c875f'}
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      selectedInput === 'password'
                        ? 'rgb(0, 0, 0)'
                        : 'rgba(21, 21, 21, 0.85)',
                  },
                ]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setSelectedInput('password')}
                onBlur={() => setSelectedInput(null)}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                {transform: [{scale: selectedInput === null ? 1 : 0.95}]},
              ]}
              onPress={handleLogin}
              activeOpacity={0.7}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  container: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 50,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderColor: colours.tint,
    borderWidth: 3,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#ffffff',
    backgroundColor: 'rgba(42, 42, 42, 0.978)',
    fontFamily: fontFam,
  },
  button: {
    backgroundColor: '#8c875f',
    borderRadius: 5,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1F1F1F',
    fontSize: 18,
  },
  scrollView: {},
});

import Auth from '@aws-amplify/auth';
import sentryErrorHandler from '../lib/errorHandler';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback, SetStateAction } from 'react';
import { Alert } from 'react-native';


import { useAuthContext } from '../context/AuthContext';
import { alreadyNavigated } from '@Navigation/linking';
import { AppStartScreen } from '../screens/index';

interface User {
  sub: string;
  email: string;
  email_verified: string;
  name: string;
  updated_at: string;
  challengeName: string;
}

const codeLength = 6;
const spacesRegex = /\s/g;
const parenthesisRegex = /[()]/g;
const dashRegex = /[-]/g;
const countryCodeDefault = '+45';
const notAuthorizedExceptionError = 'NotAuthorizedException';

function getUsernameWithCountryCode(usernameTmp: string) {
  const usernameTmpSpaceClean: string = usernameTmp
    .replace(spacesRegex, '')
    .replace(parenthesisRegex, '')
    .replace(dashRegex, '');

  if (usernameTmpSpaceClean.startsWith('+') === true) return usernameTmpSpaceClean;
  return `${countryCodeDefault}${usernameTmpSpaceClean}`;
}

const useAuth = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [userKnown, setUserKnown] = useState(false);
  const [code, setCode] = useState('');
  const [errorName, setErrorName] = useState<string | null>(null);

  const { setIsLoggedIn } = useAuthContext();

  function reset() {
    setLoading(false);
    setUsername('');
    setUser(null);
    setUserKnown(false);
    setCode('');
    setErrorName(null);
  }

  const errorHandler = useCallback(({ name, message }: { name: string; message: string }) => {
    setLoading(false);
    console.warn(message);
    Alert.alert(`Klaidele ${message}`);
    if (name !== notAuthorizedExceptionError) {
      throw new Error(name);
    }
    setErrorName(name);
  }, []);

  const redirect = useCallback(() => {
    setLoading(true);

    if (alreadyNavigated) {
      return;
    }

    navigate(AppStartScreen.Main);
  }, [navigate]);

  const signInAndRedirect = () => {
    Auth.currentUserPoolUser({ bypassCache: true })
      .then(({ attributes }) => {
        setIsLoggedIn(Boolean(attributes?.sub));

        redirect();
      })
      .catch(sentryErrorHandler);
  };
  function onChangeUsername(txt: SetStateAction<string>) {
    setUsername(txt);
    setErrorName(null);
  }

  function onCodeChange(txt: string) {
    setCode(txt.trim());
    setErrorName(null);
  }

  const codeValid = useCallback(() => user !== null && code.length === codeLength, [code.length, user]);

  function sendCode() {
    if (!username) return;
    setLoading(true);
    Auth.signIn(getUsernameWithCountryCode(username))
      .then(CognitoUser => {
        setLoading(false);
        setUser(CognitoUser);
        setUserKnown(true);
        setCode('');
      })
      .catch(errorHandler);
  }

  const signIn = useCallback(() => {
    if (user?.challengeName === 'CUSTOM_CHALLENGE') {
      if (!codeValid()) {
        return;
      }
      setLoading(true);
      Auth.sendCustomChallengeAnswer(user, code).then(signInAndRedirect).catch(errorHandler);
    } else {
      signInAndRedirect();
    }
  }, [code, codeValid, errorHandler, redirect, user]);

  function signInAuto() {
    if (codeValid()) {
      signIn();
    }
  }

  useEffect(signInAuto, [code, codeValid, signIn]);

  function init() {
    Auth.currentSession()
      .then(() => {
        setIsLoggedIn(true);
        redirect();
      })
      .catch(() => {});
    return reset;
  }
  useEffect(init, [redirect, setIsLoggedIn]);

  return {
    codeLength,
    loading,
    username,
    onChangeUsername,
    userKnown,
    sendCode,
    onCodeChange,
    code,
    signIn,
    errorName,
  };
};

export default useAuth;

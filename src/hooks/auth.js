import Auth from '@aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
// import Smartlook from 'smartlook-react-native-wrapper/lib/commonjs/index';

import { useAuthContext } from '../context/AuthContext';
import sentryErrorHandler from '../lib/error_handler';
import { alreadyNavigated } from '../navigation/linking';

const codeLength = 6;
const spacesRegex = /\s/g;
const parenthesisRegex = /[()]/g;
const dashRegex = /[-]/g;
const countryCodeDefault = '+45';

function getUsernameWithCountryCode(usernameTmp) {
  const usernameTmpSpaceClean = usernameTmp
    .replace(spacesRegex, '')
    .replace(parenthesisRegex, '')
    .replace(dashRegex, '');

  if (usernameTmpSpaceClean.startsWith('+') === true) return usernameTmpSpaceClean;
  return `${countryCodeDefault}${usernameTmpSpaceClean}`;
}

function useAuth() {
  const { replace: navReplace } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [userKnown, setUserKnown] = useState(null);
  const [code, setCode] = useState('');
  const [errorName, setErrorName] = useState(null);

  const { setIsLoggedIn } = useAuthContext();

  function reset() {
    setLoading(false);
    setUsername('');
    setUser(null);
    setUserKnown(null);
    setCode('');
    setErrorName(null);
  }

  const errorHandler = useCallback(({ name, message }) => {
    setLoading(false);
    // eslint-disable-next-line no-console
    console.warn(message);
    if (name !== 'NotAuthorizedException') {
      throw new Error(name);
    }
    sentryErrorHandler({ name, message });
    setErrorName(name);
  }, []);

  const redirect = useCallback(() => {
    setLoading(true);

    if (alreadyNavigated) {
      return;
    }

    navReplace('Main');
  }, [navReplace]);

  const signInAndRedirect = () => {
    Auth.currentUserPoolUser({ bypassCache: true })
      .then(({ attributes }) => {
        setIsLoggedIn(Boolean(attributes?.sub));

        // Smartlook.setUserIdentifier(attributes?.sub, { email: attributes?.email });

        redirect();
      })
      .catch(sentryErrorHandler);
  };
  function onChangeUsername(txt) {
    setUsername(txt);
    setErrorName(null);
  }

  function onCodeChange(txt) {
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
    if (user.challengeName === 'CUSTOM_CHALLENGE') {
      if (codeValid() === false) return;
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
}

export default useAuth;

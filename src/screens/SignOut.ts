import Auth from '@aws-amplify/auth';
import errorHandler from '../lib/errorHandler';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

import { useAuthContext } from '../context/AuthContext';
import { AppStartScreen } from '../screens/index';

const SignOut = () => {
  const { setIsLoggedIn } = useAuthContext();
  const { navigate } = useNavigation();

  const redirect = useCallback(() => {
    setIsLoggedIn(false);
    navigate(AppStartScreen.Start);
  }, [navigate]);

  useEffect(() => {
    Auth.signOut().then(redirect).catch(errorHandler);
  }, [redirect]);

  return null;
};

export default SignOut;

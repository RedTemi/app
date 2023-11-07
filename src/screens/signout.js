import { useCallback, useEffect } from 'react';
import Auth from '@aws-amplify/auth';
import errorHandler from '../lib/error_handler';

import { useAuthContext } from '../context/AuthContext';

function SignOut({ navigation: { navigate } }) {
  const { setIsLoggedIn } = useAuthContext();

  const redirect = useCallback(() => {
    setIsLoggedIn(false);
    navigate('Start');
  }, [navigate]);

  useEffect(() => {
    Auth.signOut().then(redirect).catch(errorHandler);
  }, [redirect]);
  return null;
}

export default SignOut;

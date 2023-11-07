import { setUser } from '../lib/sentry';
import userInfo from '../lib/userinfo';
import { useEffect } from 'react';

const useSentryUser = () => {
  const identify = () => {
    userInfo().then(setUser);
  };

  const init = () => {
    const id = setTimeout(identify, 3000);
    return clearTimeout.bind(null, id);
  };

  useEffect(init, []);
};

export default useSentryUser;

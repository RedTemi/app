import { setUser } from '@Lib/sentry';
import userInfo from '@Lib/userinfo';
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

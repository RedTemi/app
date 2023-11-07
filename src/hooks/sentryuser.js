import { useEffect } from 'react';
import userInfo from '../lib/userinfo';
import { setUser } from '../lib/sentry';

function useSentryUser() {
  function identify() {
    userInfo().then(setUser);
  }
  function init() {
    const id = setTimeout(identify, 3000);
    return clearTimeout.bind(null, id);
  }
  useEffect(init, []);
}

export default useSentryUser;

import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useRef } from 'react';
import * as Sentry from 'sentry-expo';
// import Smartlook from 'smartlook-react-native-wrapper/lib/commonjs/index';

import GlobalError from './GlobalError';
import linking from './linking';
import NavSwitch from './switch';

const trackScreen = (screenName: string) => {
  // Smartlook.trackNavigationEvent(screenName);
};

const NavContainer = () => {
  const navigationRef = useRef<NavigationContainerRef | null>(null);
  const routeNameRef = useRef<NavigationContainerRef | null>(null);

  const getCurrentRouteName = () => {
    if (navigationRef.current && navigationRef.current.getCurrentRoute()) {
      const currentRoute = navigationRef.current.getCurrentRoute();

      if (currentRoute) {
        return currentRoute.name;
      }
    }
    return;
  };

  const onReady = () => {
    routeNameRef.current = getCurrentRouteName();
  };

  const onStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getCurrentRouteName();

    if (previousRouteName !== currentRouteName) {
      // trackScreen(currentRouteName);
    }
    routeNameRef.current = currentRouteName;
  };

  return (
    <Sentry.Native.ErrorBoundary fallback={() => <GlobalError />}>
      <NavigationContainer linking={linking} ref={navigationRef} onReady={onReady} onStateChange={onStateChange}>
        <NavSwitch />
      </NavigationContainer>
    </Sentry.Native.ErrorBoundary>
  );
};

export default NavContainer;

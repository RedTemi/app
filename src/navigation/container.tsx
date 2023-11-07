import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useRef } from 'react';


import linking from '../navigation/linking';
import NavSwitch from '../navigation/NavSwitch';

const NavContainer = () => {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string | null>(null);

  const getCurrentRouteName = () => {
    if (navigationRef.current && navigationRef.current.getCurrentRoute()) {
      const currentRoute = navigationRef.current.getCurrentRoute();

      if (currentRoute) {
        return currentRoute.name;
      }
    }
    return null;
  };


  const onReady = () => {
    routeNameRef.current = getCurrentRouteName();
  };

  const onStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getCurrentRouteName();
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer linking={linking} ref={navigationRef} onReady={onReady} onStateChange={onStateChange}>
      <NavSwitch />
    </NavigationContainer>
  );
};

export default NavContainer;
